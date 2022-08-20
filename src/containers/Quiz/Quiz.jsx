import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { fetchQuizById, quizAnswerClick, retryQuiz } from "../../store/actions/quizActions";
import { useParams } from "react-router-dom";
import { Avatar, Grid, Stack } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export function withRouter(Children) {

    return (props) => {

        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}


class Quiz extends React.Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    onAnswerClickHandler = answerId => {
        this.props.quizAnswerClick(answerId);
    };

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <Stack >
                        <Avatar style={{top: '1rem', margin: '1rem' }}>{this.props.activeQuestionNumber + 1}</Avatar>
                    </Stack>
                    

                    {
                        this.props.isLoading || !this.props.quiz
                            ? <Loader />
                            :
                            this.props.isQuizFinished
                                ? <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRetry={this.props.retryQuiz}
                                />
                                : <ActiveQuiz
                                    questionNumber={this.props.activeQuestionNumber + 1}
                                    question={this.props.currentQuizQuestion.question}
                                    answers={this.props.currentQuizQuestion.answers}
                                    onAnswerClick={this.onAnswerClickHandler}
                                    answerState={this.props.answerState}
                                    quizLength={this.props.quiz.length}
                                />

                    }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeQuestionNumber: state.currentQuiz.activeQuestionNumber,
        isQuizFinished: state.currentQuiz.isQuizFinished,
        answerState: state.currentQuiz.answerState, // { [id]: "success"/"error" } - current state
        results: state.currentQuiz.results, // { [id]: "success"/"error" } - all first states
        quiz: state.currentQuiz.quiz,
        currentQuizQuestion: state.currentQuiz.currentQuizQuestion,
        isLoading: state.currentQuiz.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: quizId => dispatch(fetchQuizById(quizId)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz));