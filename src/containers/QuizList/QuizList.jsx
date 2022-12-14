import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import classes from "./QuizList.module.css";
import {fetchQuizList} from "../../store/actions/quizActions";
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends Component {

    componentDidMount() {
        this.props.fetchQuizList();
    }

    renderQuizList() {
        return this.props.quizList.map(quiz => {
            return (
                    <li key={quiz.id} className="list-group-item" style={{width:'100%', height:'100%', display:'flex'}}>
                        <input className="form-check-input check" type="checkbox" id={quiz.id} disabled style={{width:"50px", height:'25px', float: "left"}}/>
                        <NavLink to={"/quiz/" + quiz.id} style={{width:'100%', height:'100%'}}>
                            {quiz.name}
                        </NavLink>
                        
                    </li>
            );
        });
    };

    render() {
        return (
            <div className={classes.QuizList} style={{ width:'93%', position:'relative', left:'7%'}}>
                <div className="row justify-content-end" style={{ width:'95%'}}>
                <div className="col-lg-6 col-md-12 col-sm-12" style={{borderRadius:'none'}}>
                    <h1 className="card-header col-lg-6 col-md-7 col-sm-12">My Courses</h1>
                    
                    <div className="row">
                        <div className="card col-lg-12 col-md-12 col-sm-12" style={{ width:'95%', position:'relative', left:'-1%'}} >
                        <h2 className="card-title" style={{color:'white', fontWeight:'300'}}>Private Pilot</h2>
                        
                        <div className="card-body " >
                            <hr style={{margin:'30px 0'}}/>
                            {
                                this.props.isLoading && this.props.quizList.length > 0
                                    ? <Loader/>
                                    : <ul className="list-group list-group-flush ">
                                        {this.renderQuizList()}
                                    </ul>
                            }
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        quizList: state.currentQuiz.quizList,
        isLoading: state.currentQuiz.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizList: () => dispatch(fetchQuizList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);