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
                <div class="form-check" style={{margin:'20px 0', gap:'15px'}}>
                    <input class="form-check-input" type="checkbox" readOnly style={{width:"50px", height:'30px', float: "left"}}/>
                    <label class="form-check-label" for="flexCheckDefault">
                        <li key={quiz.id} class="list-group-item">
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
                <div class="row justify-content-end" style={{ width:'80%', height:'95%', position:'absolute', left: '12%'}}>
                <div class="card col-lg-4 col-md-7 col-sm-12" style={{ background:"white"}}>
                    <h1 class="card-header col-lg-4 col-md-7 col-sm-12" style={{background:'grey'}}>Mis Cursos</h1>
                    
                    <div class="row">
                        <div class="card col-lg-4 col-md-12 col-sm-12"  >
                        <h2 class="card-title col-lg-4 col-md-7 col-sm-12" style={{color:'black'}}>Piloto Privado</h2>
                        <div class="card-body col-lg-4 col-md-7 col-sm-12" >
                            <hr style={{margin:'30px 0'}}/>
                            {
                                this.props.isLoading && this.props.quizList.length > 0
                                    ? <Loader/>
                                    : <ul class="list-group list-group-flush col-lg-4 col-md-7 col-sm-12">
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