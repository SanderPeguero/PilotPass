import { Box } from "@mui/material"
import classes from "./Quiz.module.css"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Loader from '../../components/Loader/Loader'
import { useSelector, useDispatch } from "react-redux"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"
import { fetchStart, fetchStop } from '../../redux/loading/slice'
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz"
import { fetchQuizList,fetchQuizById, quizAnswerClick, retryQuiz } from "../../redux/courses/functions"

export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() }
        return <Children {...props} match={match} />
    }
}

const Quiz = (props) => {

    const dispatch = useDispatch()
    const quiz = useSelector(state => state.courses.quiz)
    const loader = useSelector(state => state.loading.loading)
    const results = useSelector(state => state.courses.results)
    const response = useSelector(state => state.courses.response)
    const isLoading = useSelector(state => state.courses.isLoading)
    const answerState = useSelector(state => state.courses.answerState)
    const isQuizFinished = useSelector(state => state.courses.isQuizFinished)
    const currentQuizQuestion = useSelector(state => state.courses.currentQuizQuestion)
    const activeQuestionNumber = useSelector(state => state.courses.activeQuestionNumber)
    
    useEffect(() => {
        
        if(!response){
            dispatch(fetchStart())
            dispatch(fetchQuizList())
        }else if(response){
            dispatch(fetchQuizById(props.match.params.id))
            dispatch(fetchStop())
            dispatch(fetchStop())
        }
            
        window.addEventListener("beforeunload", alertUser)
    }, [response])

    // Component will unmount
    useEffect(() => {
        // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        return () => {
            dispatch(retryQuiz())
            window.removeEventListener("beforeunload", alertUser)
        }
    }, []);
    
    const alertUser = (e) => {
        e.preventDefault()
        // e.returnValue = "Refresh"
    }
    
    //Timer 
    const THREE_DAYS_IN_MS = 2 * 3600 * 1000
    const [timer, settimer] = useState(THREE_DAYS_IN_MS)
    const minutes = Math.floor((timer % 3600000) / 60000)
    const seconds = Math.floor((timer % 60000) / 1000)
    const hours = Math.floor((timer / 1000) / 3600)
    const MINUTE_MS = 1000

    useEffect(() => {

        if(timer > 0){
            const interval = setInterval(() => {
                let times = timer
                settimer(times - 1000)
            }, MINUTE_MS)
            // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
            return () => clearInterval(interval)
        }else{
            console.log("Time is over!")
        }

    }, [timer])

    const onAnswerClickHandler = answerId => {
        dispatch(quizAnswerClick(answerId))
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
                                        onRetry={retryQuiz}
                                    />

                                : <ActiveQuiz
                                    questionNumber={activeQuestionNumber + 1}
                                    question={currentQuizQuestion.question}
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

export default withRouter(Quiz)