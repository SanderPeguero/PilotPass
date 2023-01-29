import React from "react";
import './TestResult.module.css'
import { NavLink } from "react-router-dom";
import classes from "./TestResult.module.css";
import Loader from "../../components/UI/Loader/Loader";
import Alert from '../../components/Alert/Snackbar'
import styles from '../QuizList/Card.module.css'
import result1 from '../../Images/result1.jpg'

const result = [

    {
        id: 1,
        subject: 'Aerodynamics',
        image: result1,
        RightAnswered: 7,
        incorrectanswer: 5,
        questionquantity: 12,

        preguntas: [
            {
                1: [
                    { answer1: "answer 1" },
                    { answer2: "answer 2" },
                    { answer3: "answer 3" },
                    { Question: "Pregunta 1" },
                    { correctAnswer: 1 }
                ],

                2: [
                    { answer1: "answer 1" },
                    { answer2: "answer 2" },
                    { answer3: "answer 3" },
                    { Question: "Pregunta 1" },
                    { correctAnswer: 1 }
                ],

                3: [
                    { answer1: "answer 1" },
                    { answer2: "answer 2" },
                    { answer3: "answer 3" },
                    { Question: "Pregunta 1" },
                    { correctAnswer: 1 }
                ],
            }
        ],



    },

    {
        id: 2,
        subject: 'Controles de vuelo',
        image: result1,
        RightAnswered: 6,
        incorrectanswer: 0,
        questionquantity: 6,

        preguntas: [
            {
                1: [
                    { answer1: "answer 1" },
                    { answer2: "answer 2" },
                    { answer3: "answer 3" },
                    { Question: "Pregunta 1" },
                    { correctAnswer: 1 }
                ],

                2: [
                    { answer1: "answer 1" },
                    { answer2: "answer 2" },
                    { answer3: "answer 3" },
                    { Question: "Pregunta 1" },
                    { correctAnswer: 1 }
                ],
                
                3: [
                    { answer1: "answer 1" },
                    { answer2: "answer 2" },
                    { answer3: "answer 3" },
                    { Question: "Pregunta 1" },
                    { correctAnswer: 1 }
                ],
            }
        ],

    },

    {
        id: 3,
        subject: 'Estructura de Avion',
        image: result1,
        RightAnswered: 3,
        incorrectanswer: 1,
        questionquantity: 4,

        preguntas: [
            {
                1: [
                    { answer1: "answer 1" },
                    { answer2: "answer 2" },
                    { answer3: "answer 3" },
                    { Question: "Pregunta 1" },
                    { correctAnswer: 1 }
                ],

                2: [
                    { answer1: "answer 1" },
                    { answer2: "answer 2" },
                    { answer3: "answer 3" },
                    { Question: "Pregunta 1" },
                    { correctAnswer: 1 }
                ],
                
                3: [
                    { answer1: "answer 1" },
                    { answer2: "answer 2" },
                    { answer3: "answer 3" },
                    { Question: "Pregunta 1" },
                    { correctAnswer: 1 }
                ],
            }
        ],
    },




];


const TestResult = () => {


    const renderResult = () => {

        return (
            <>{

                result.map((res) => {

                    return (
                        <NavLink key={res.id} to={"/result/" + res} style={{ width: '100%', height: '100%', textDecoration: 'none' }}>
                            <div >
                                <div className={styles.card}>
                                    <img className={styles.cardImage} src={res.image} />

                                    <div className={styles.cardInfoContainer}>

                                        <h3 className={styles.cardInfoh3}>
                                            {res.subject} Rating
                                            
                                        </h3>

                                        <div style={{ width: "278px", textAlign: 'left', color: 'gray' }}>
                                            <div >  Right Answered: {res.RightAnswered}/{res.questionquantity}</div>
                                            <br />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    )
                })


            }

            </>
        )
    }

    return (
        <div className={classes.QuizList}>
            {/* {error ? <Alert severity={5} title={"Error"} detail={error} /> : null} */}
            <div className="row cards" style={{ height: '95%', position: 'absolute' }}>
                <div className="col-lg-4 col-md-7 col-sm-12" style={{ paddingTop: '2rem', paddingBottom: '100px' }}>
                    <h1 className="card-header col-lg-4 col-md-7 col-sm-12">My Result</h1>

                    <div className="row">
                        <div className="card col-lg-4 col-md-12 col-sm-12"  >
                            <h2 className="card-title col-lg-4 col-md-7 col-sm-12" style={{ color: 'white', fontWeight: '300' }}>Private Pilot</h2>

                            <div>
                                <hr style={{ margin: '30px 0' }} />

                                <div className={styles.readthedocs}>
                                    {renderResult()}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestResult