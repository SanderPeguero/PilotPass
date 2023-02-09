import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "../Quiz/Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
// import { quizAnswerClick, retryQuiz } from "../../redux/courses/functions"; 
import { fetchTest, testAnswerClick } from "../../redux/test/functions";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import store from "../../redux/store";

export function withRouter(Children) {

    return (props) => {

        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

const Test = (props) => {

    const activeQuestionNumber = useSelector(state => state.test.activeQuestionNumber)
    const currentQuizQuestion = useSelector(state => state.test.currentTestQuestion)
    const isQuizFinished = useSelector(state => state.test.isTestFinished)
    const answerState = useSelector(state => state.test.answerState)
    const results = useSelector(state => state.test.results)
    const quiz = useSelector(state => state.test.questions)
    const [isLoading, setIsLoading] = useState(false)
    console.log(currentQuizQuestion)  //
        //  const quiz = store.getState().test.questions;
    //useSelector(state => state.courses.isLoading);
    const dispatch = useDispatch();

    const List = useSelector(state => state.courses.quizList);

    const name = () => {

        let n = ''

        List.map(obj => {
            obj["id"] == props.match.params.id ? n = obj.name : null
        })

        return n
    }


    //Component did mount
    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchTest())
        console.log("UseEffect DidMount in Test Component")
        setIsLoading(false)
        // dispatch(fetchQuizById(props.match.params.id))

    }, []);

    // Component will unmount
    useEffect(() => {

        // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        return () => {

            dispatch(retryQuiz())
            //dispatch(fetchQuizById(props.match.params.id))
            // const interval = setInterval(() => {
            // }, 100);

            // clearInterval(interval)

        }

    }, []);

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

    return (
        <Box className={classes.Quiz}>
            <div className="row cards col-lg-4 col-md-7 col-sm-12" style={{ paddingTop: '2rem', paddingBottom: '100px' }}>
                <div className="card-header col-lg-4 col-md-7 col-sm-12" style={{ color: 'white', margin: "2%" }}>
                    <h2 className="col-lg-4 col-md-7 col-sm-12">Test: {name()}</h2>
                </div>

                <div className="card col-lg-4 col-md-7 col-sm-12">
                    <div className="card-header">
                        <p className="row" style={{ color: 'white' }}>
                            <span className="">Question {activeQuestionNumber + 1}</span>
                            <span className="" style={{ float: 'right' }}>{timer > 1 ? `Time Left: ${hours}:${minutes}:${seconds}` : "TIME IS OVER"}</span>
                        </p>
                    </div>
                    <hr />

                    <div>
                        {
                            isLoading || !quiz
                                ? <Loader />
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
    )
}

export default withRouter(Test)