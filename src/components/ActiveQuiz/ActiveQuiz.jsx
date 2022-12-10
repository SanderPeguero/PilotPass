import React from "react";
import classes from "./ActiveQuiz.module.css";
import AnswersList from "../AnswersList/AnswersList";

const ActiveQuiz = props => (
    <React.Fragment>
        {/* <h1>Take the Quiz</h1> */}

        <div className={classes.ActiveQuiz}>

            <p className={classes.Question} style={{margin:'15px 20px'}}>

                <span>
                    <strong>{props.questionNumber}. {props.question}</strong>
                </span>

                <small style={{ width: '7rem', textAlign: 'center'}}>{props.questionNumber} / {props.quizLength}</small>
            </p>

            <AnswersList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                answerState={props.answerState}
            />
        </div>
    </React.Fragment>
);

export default ActiveQuiz;