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
                <div className="form-check form-check-inline" key={quiz.id} style={{margin:'20px 0', gap:'15px'}}>
                    <input className="form-check-input" type="checkbox" id="flexCheckDefault" disabled style={{width:"50px", height:'30px', float: "left"}}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        <li key={quiz.id} className="list-group-item">
                            <NavLink to={"/quiz/" + quiz.id}>
                                {quiz.name}
                            </NavLink>
                        </li>
                    </label>
                </div>
            );
        });
    };

    render() {
        return (
            <div className={classes.QuizList}>
                <div className="row justify-content-end" style={{ width:'80%', height:'95%', position:'absolute', left: '12%'}}>
                <div className="col-lg-4 col-md-7 col-sm-12">
                    <h1 className="card-header col-lg-4 col-md-7 col-sm-12">My Courses</h1>
                    
                    <div className="row">
                        <div className="card col-lg-4 col-md-12 col-sm-12"  >
                        <h2 className="card-title col-lg-4 col-md-7 col-sm-12" style={{color:'white', fontWeight:'300'}}>Private Pilot</h2>
                        
                        <div className="card-body col-lg-4 col-md-7 col-sm-12" >
                            <hr style={{margin:'30px 0'}}/>
                            {
                                this.props.isLoading && this.props.quizList.length > 0
                                    ? <Loader/>
                                    : <ul className="list-group list-group-flush col-lg-4 col-md-7 col-sm-12">
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