import React from "react";
import { Link } from "react-router-dom";
import classes from "./FinishedQuiz.module.css"
import Button from "../UI/Button/Button";
import { Box } from "@mui/material";

const FinishedQuiz = props => {
    const rightAnswersCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === "success")
            total++;
        return total;
    }, 0);

    return (
        <React.Fragment>
            <h1 style={{ margin: '25px' }}>Finished</h1>
            <div className={classes.FinishedQuiz}>
                <h3>Right Answered: {rightAnswersCount}/{props.quiz.length}</h3>
               
                    <ul>

                        {props.quiz.map((quizItem, index) => {
                            const classNames = [
                                "fa",
                                props.results[quizItem.id] === "error" ? "fa-times" : "fa-check",
                                classes[props.results[quizItem.id]]
                            ];
                            return (

                                <li key={index} style={{ marginTop: "2rem" }}>
                                    <strong>{index + 1}. {quizItem.question}</strong>
                                    <i className={classNames.join(" ")} />
                                </li>
                            )
                        })}

                    </ul>

                    <div>
                        <Link to={"/"}>
                            <Button onClick={props.onRetry} type="success">To Quiz List</Button>
                        </Link>
                        <Button onClick={props.onRetry} type="primary">Retry</Button>
                    </div>
            </div>
        </React.Fragment>
    );
};

export default FinishedQuiz;

