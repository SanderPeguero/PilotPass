import { Box } from "@mui/material"
import store from "../../redux/store"
import { useParams } from "react-router-dom"
import classes from "../Quiz/Quiz.module.css"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../../components/UI/Loader/Loader"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz"
import { fetchStart, fetchStop } from '../../redux/loading/slice'
// import { quizAnswerClick, retryQuiz } from "../../redux/courses/functions"
import { testAnswerClick, retryExam, fetchExams, fetchRandomExam } from "../../redux/test/functions"

export function withRouter(Children) {

    return (props) => {

        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

const Exam = (props) => {

    const activeQuestionNumber = useSelector(state => state.test.activeQuestionNumber)
    const currentQuizQuestion = useSelector(state => state.test.currentTestQuestion)
    const isQuizFinished = useSelector(state => state.test.isTestFinished)
    const answerState = useSelector(state => state.test.answerState)
    const loader = useSelector(state => state.loading.loading)
    const response = useSelector(state => state.test.response)
    const results = useSelector(state => state.test.results)
    const List = useSelector(state => state.test.response)
    const quiz = useSelector(state => state.test.test)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(!response){
            dispatch(fetchStart())
            dispatch(fetchExams())
        }else if(response){
            dispatch(fetchRandomExam(props.match.params.id))
            dispatch(fetchStop())
            dispatch(fetchStop())
        }
            
        window.addEventListener("beforeunload", alertUser)
    }, [response])

    // Component will unmount
    useEffect(() => {
        dispatch(fetchExams())
        // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        return () => {
            dispatch(retryExam())
            window.removeEventListener("beforeunload", alertUser)
        }
    }, []);

    const alertUser = (e) => {
        e.preventDefault()
        // e.returnValue = "Refresh"
    }

    const THREE_DAYS_IN_MS = 2 * 3600 * 1000;

    const [timer, settimer] = useState(THREE_DAYS_IN_MS)

    const hours = Math.floor((timer / 1000) / 3600);
    const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timer % (1000 * 60)) / 1000);

    //Timer 
    const MINUTE_MS = 1000;

    useEffect(() => {

        if (timer > 0) {

            const interval = setInterval(() => {
                let times = timer
                settimer(times - 1000)
            }, MINUTE_MS);

            // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
            return () => clearInterval(interval);

        } else {
            console.log("Time is over!")

        }


    }, [timer])

    const onAnswerClickHandler = answerId => {
        dispatch(testAnswerClick(answerId))
    }

    if(loader){
        return(
            <Loader/>
        )
    }

    return (
        <> 
        { loader || !quiz ? null :
            <Box className={classes.Quiz}>
                <div className="row cards col-lg-4 col-md-7 col-sm-12" style={{ paddingTop: '2rem' , paddingBottom: '100px'}}>
                    <div className="card-header col-lg-4 col-md-7 col-sm-12" style={{color:'white', margin: "2%"}}>
                        <h2 className="col-lg-4 col-md-7 col-sm-12">Test: {response[props.match.params.id].subject}</h2>
                    </div>

                    <div className="card col-lg-4 col-md-7 col-sm-12">
                        <div className="card-header">
                            <p className="row" style={{color:'white'}}> 
                                <span className="">Question {activeQuestionNumber + 1} / {quiz.length}</span>  
                                <span className="" style={{float:'right'}}>{timer > 1 ? `Time Left: ${hours}:${minutes}:${seconds}` : "TIME IS OVER" }</span> 
                            </p>
                        </div>
                        <hr />

                        <div>
                            {
                                isLoading || !quiz
                                ? null
                                :
                                isQuizFinished
                                ? 
                            
                                    <FinishedQuiz
                                        results={results}
                                        quiz={quiz}
                                        onRetry={retryExam}
                                    />

                                : <ActiveQuiz
                                    questionNumber={activeQuestionNumber + 1}
                                    question={currentQuizQuestion.question}
                                    image={currentQuizQuestion.imagen}
                                    answers={currentQuizQuestion}
                                    onAnswerClick={onAnswerClickHandler}
                                    answerState={answerState}
                                    quizLength={quiz.length}
                                />
                            }
                        </div>
                    </div>
                </div>
            </Box>
        }
        </>
    )
}

export default withRouter(Exam)