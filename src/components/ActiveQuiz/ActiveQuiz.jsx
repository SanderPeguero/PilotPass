import React from "react";
import classes from "./ActiveQuiz.module.css";
import AnswersList from "../AnswersList/AnswersList";

const ActiveQuiz = props => (
    <React.Fragment>
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span className="col-lg-4 col-md-7 col-sm-12">
                    <strong>{props.questionNumber}. {props.question}</strong>
                </span>
                <small style={{ width: '20rem', textAlign: 'end'}}>{props.questionNumber} / {props.quizLength}</small>
            </p>
            <AnswersList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                answerState={props.answerState}
                questionId={props.questionNumber}
            />
        </div>
    </React.Fragment>
);

export default ActiveQuiz;