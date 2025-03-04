//dependencies
import React from "react";

//styles
import classes from "../styles/ActiveQuiz.module.css";

//components
import AnswersList from "./AnswersList";

const ActiveQuiz = props => (
    <React.Fragment>
        <div className={classes.ActiveQuiz}>
            {
                props.image ? 
                <div>
                    <img src={props.image} alt={props.image} className=" sm:w-[25rem] w-[80vw]" />
                </div>
                :
                null
            }
            <p className={classes.Question}>
                <span className="col-lg-4 col-md-7 col-sm-12">
                    <strong>{props.questionNumber}. {props.question}</strong>
                </span>
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