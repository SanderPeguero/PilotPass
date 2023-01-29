import React from "react";
import styles from './answerresult.css'
import { Typography } from "@mui/material";
import Button from "../UI/Button/Button";

const quiz = [
    {
        id: 1,
        question: "Qué condiciones puede provocar que el altímetro indique una altura menor que la altitud verdadera?",
        answer1: "Answer 1",
        answer2: "Answer 2",
        answer3: "Answer 3",
        Correctanswer: "Answer 1",


    },
    {
        id: 1,
        question: "Si un vuelo es hecho desde un área de alta presión, hasta un área de baja presión sin haber ajustado el altímetro, este podría indicar:",
        answer1: "Answer 1",
        answer2: "Answer 2",
        answer3: "Answer 3",
        Correctanswer: "Answer 2",


    },

    {
        id: 1,
        question: "Si un vuelo es hecho desde un área de alta presión, hasta un área de baja presión sin haber ajustado el altímetro, este podría indicar:",
        answer1: "Answer 1",
        answer2: "Answer 2",
        answer3: "Answer 3",
        Correctanswer: "Answer 3",


    }
]


const AnswerResult = () => {

    return (
        <React.Fragment>
            <h1 style={{ margin: '0', marginTop: '25px'}}>Finished</h1>
            <div className={styles.FinishedQuiz}>
                <h3 style={{color: 'white'}}>Right Answered: {7}/{12}</h3>

                <ul>

                    {quiz.map((quizitem, index) => {
                        
                        return (
                            <li key={index} style={{ marginTop: "2rem", marginLeft: "2rem" }}>
                                <strong style={{color: 'white'}}>{index + 1}. {quizitem.question}</strong><br />


                                {/* <div className="form-check" style={{ margin: '5px', display: '-webkit-inline-box', alignItems: 'center' }} > */}
                                    {/* <input className="`form-check-input" type="radio" name="flexRadioDefault"  style={{ width: '20px', height: '20px' }}></input> */}
                                    <div style={{color: 'white'}}>
                                        {quizitem.answer1}<br />
                                        {quizitem.answer2}<br />
                                        {quizitem.answer3}<br />
                                        <div className={styles.success}>
                                            Correct answer is: {quizitem.Correctanswer}
                                        </div>
                                    </div>

                                {/* </div> */}


                            </li>
                        )
                    })}

                    {/* {props.quiz.map((quizItem, index) => {
                        const classNames = [
                            "fa",
                            props.results[index] === "error" ? "fa-times" : "fa-check",
                            styles[props.results[quizItem.id]]
                        ];
                        return (

                            <li key={index} style={{ marginTop: "2rem" }}>
                                <strong>{index + 1}. {quizItem.question}</strong>
                                <i className={classNames.join(" ")} />
                            </li>
                        )
                    })} */}

                </ul>

                {/* <div style={{display: 'flex'}}>
                    <Button onClick={""} type="success">To Quiz List</Button>
                    <Button onClick={""} type="primary">Retry</Button>
                </div> */}
            </div>
        </React.Fragment>
        // <>
        //     <Typography style={{color: 'black'}}  variant="h4" gutterBottom>
        //        Answer Result
        //     </Typography>
        // </>
    )
}

export default AnswerResult