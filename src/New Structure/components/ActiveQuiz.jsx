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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <button
                    onClick={props.onPrevClick}
                    disabled={props.questionNumber === 1}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                    Previous
                </button>

                {props.questionNumber < props.quizLength ? (
                    <button
                        onClick={props.onNextClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={props.onFinishClick}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Finish
                    </button>
                )}
            </div>
        </div>
    </React.Fragment>
);

export default ActiveQuiz;