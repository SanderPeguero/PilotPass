import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { fetchQuizById, quizAnswerClick, retryQuiz } from "../../redux/courses/functions";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

export function withRouter(Children) {

    return (props) => {

        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}

const Quiz = (props) => {

    const activeQuestionNumber = useSelector(state => state.courses.activeQuestionNumber);
    const isQuizFinished = useSelector(state => state.courses.isQuizFinished);
    const answerState = useSelector(state => state.courses.answerState);
    const results = useSelector(state => state.courses.results);
    const quiz = useSelector(state => state.courses.quiz);
    const currentQuizQuestion = useSelector(state => state.courses.currentQuizQuestion);
    const isLoading = useSelector(state => state.courses.isLoading);
    const dispatch = useDispatch();
    
    const List = useSelector(state => state.courses.quizList);

    const name = () => {

        let n = ''

        List.map( obj => {
            obj["id"] == props.match.params.id ? n = obj.name : null
        })

        return n
    }

    //Component did mount
    useEffect(() => {

        dispatch(fetchQuizById(props.match.params.id))
        
    }, []);

    //Component will unmount
    useEffect(() => {

        return () => {

            dispatch(fetchQuizById(props.match.params.id))
            dispatch(retryQuiz())

        }
        
    }, []);

    const onAnswerClickHandler = answerId => {
        dispatch(quizAnswerClick(answerId))
    }

    return (
        <Box className={classes.Quiz}>
            <div className="row cards col-lg-4 col-md-7 col-sm-12">
                <div className="card-header col-lg-4 col-md-7 col-sm-12" style={{color:'white', margin: "2%"}}>
                    <h2 className="col-lg-4 col-md-7 col-sm-12">Test: {name()}</h2>
                </div>

                <div className="card col-lg-4 col-md-7 col-sm-12">
                    <div className="card-header">
                        <p className="row" style={{color:'white'}}> 
                            <span className="">Question {activeQuestionNumber + 1}</span>  
                            <span className="" style={{float:'right'}}>1:43:00</span> 
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

export default withRouter(Quiz)