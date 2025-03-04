//dependencies
import React from "react";
import { useNavigate } from "react-router-dom";

//styles
import classes from "../styles/FinishedQuiz.module.css"

//components
import Button from "../components/Button";

const FinishedQuiz = props => {
    
    const navigate  = useNavigate()

    const onQuizList = () => {
        props.onRetry()
        navigate('/')
    }

    const onRetry = () => {
        props.onRetry()
    }

    const rightAnswersCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === "success")
            total++;
        return total;
    }, 0);

    return (
        <React.Fragment>
            <h1 style={{ margin: '0', marginTop: '25px' }}>Finished</h1>
            <div className={classes.FinishedQuiz}>
                <h3>Right Answered: {(rightAnswersCount/props.quiz.length) * 100}%</h3>
               
                    <ul>

                        {props.quiz.map((quizItem, index) => {
                            const classNames = [
                                "fa",
                                props.results[index] === "error" ? "fa-times" : "fa-check",
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

                    <div style={{display: 'flex'}}>
                        <Button onClick={onQuizList} type="success">To Quiz List</Button>
                        <Button onClick={onRetry} type="primary">Retry</Button>
                    </div>
            </div>
        </React.Fragment>
    );
};

export default FinishedQuiz;

