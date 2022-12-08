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
                <div class="card" style={{Width:'20rem', background:"white"}}>
                    <h1 class="card-header" style={{background:'grey'}}>Mis Cursos</h1>
                    
                    <div class="card" style={{width: '66rem'}} >
                    <h2 class="card-title" style={{color:'black'}}>Piloto Privado</h2>
                    <div class="card-body" style={{width: '100%'}} >
                        <hr style={{margin:'30px 0'}}/>
                        {
                            this.props.isLoading && this.props.quizList.length > 0
                                ? <Loader/>
                                : <ul class="list-group list-group-flush">
                                    {this.renderQuizList()}
                                </ul>
                        }
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