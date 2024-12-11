import { Box } from "@mui/material"
import { useParams } from "react-router-dom"
import classes from '../../Tests/Quiz/Quiz.module.css'
import React, { useEffect, useState } from "react"
import ActiveQuiz from "../../../components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from "../../../components/FinishedQuiz/FinishedQuiz"
import { useContextPilotPass } from "../../../Context"

// HOC to inject router props into the component
export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };  // Access URL params
        return <Children {...props} match={match} />
    }
}

const ExamComponent = (props) => {

    // Destructure context values from useContextPilotPass
    const {
        ExamActiveQuestionNumber,
        Exam,
        currentTestQuestion,
        isExamFinished,
        ExamAnswerState,
        ExamResponse,
        ExamResults,
        ExamAnswerClick,
        retryExam,
        resetExamState,
        fetchExams,
        fetchRandomExam,
        fetchStart,
        fetchStop,
    } = useContextPilotPass()

    // Fetch exams based on ExamResponse state
    useEffect(() => {
        if (!ExamResponse) {
            fetchStart()  // Start fetching exams
            fetchExams()  // Fetch all exams
        } else if (ExamResponse) {
            fetchRandomExam(props.match.params.id)  // Fetch a specific exam
            fetchStop()  // Stop fetching
            fetchStop()  // Redundant, probably should be removed
        }
        window.addEventListener("beforeunload", alertUser)  // Add event listener on before unload
    }, [ExamResponse])

    // Cleanup on component unmount: reset exam state and remove event listener
    useEffect(() => {
        return () => {
            resetExamState()  // Reset the exam state
            window.removeEventListener("beforeunload", alertUser)  // Remove event listener
        }
    }, []);

    const alertUser = (e) => {
        e.preventDefault()  // Prevent default behavior on before unload
    }

    // Timer setup: Set the initial time for the exam (2 hours)
    const THREE_DAYS_IN_MS = 2 * 3600 * 1000;  // 2 hours in milliseconds
    const [timer, settimer] = useState(THREE_DAYS_IN_MS)
    const hours = Math.floor((timer / 1000) / 3600);  // Calculate hours
    const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));  // Calculate minutes
    const seconds = Math.floor((timer % (1000 * 60)) / 1000);  // Calculate seconds
    const MINUTE_MS = 1000;  // Interval for 1 second

    // Effect to update the timer every second
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                settimer((prev) => prev - 1000)  // Decrease timer by 1 second
            }, MINUTE_MS);
            return () => clearInterval(interval);  // Cleanup interval when timer reaches 0
        } else {
            console.log("Time is over!")  // Log when time is over
        }
    }, [timer])

    // Handler for when an answer is clicked
    const onAnswerClickHandler = answerId => {
        ExamAnswerClick(answerId)  // Call ExamAnswerClick with the selected answerId
    }

    return (
        <>
            {/* Render the exam UI if there are exam data */}
            {!Exam ? null : (
                <Box className={classes.Quiz}>
                    <div className="row cards col-lg-4 col-md-7 col-sm-12" style={{ paddingTop: '2rem', paddingBottom: '100px' }}>
                        <div className="card-header col-lg-4 col-md-7 col-sm-12" style={{ color: 'white', margin: "2%" }}>
                            <h2 className="col-lg-4 col-md-7 col-sm-12">Exam: {ExamResponse[props.match.params.id].subject}</h2>
                        </div>

                        <div className="card col-lg-4 col-md-7 col-sm-12">
                            <div className="card-header">
                                <p className="row" style={{ color: 'white' }}>
                                    <span className="">Question {ExamActiveQuestionNumber + 1} / {Exam.length}</span>
                                    <span className="" style={{ float: 'right' }}>
                                        {timer <= 0 ? "TIME IS OVER" : `Time Left: ${hours}:${minutes}:${seconds}`}
                                    </span>
                                </p>
                            </div>
                            <hr />

                            <div>
                                {/* Conditional rendering: Show finished quiz or active quiz */}
                                {isExamFinished ? (
                                    <FinishedQuiz
                                        results={ExamResults}  // Display results of the exam
                                        quiz={Exam}  // Pass the exam data
                                        onRetry={retryExam}  // Option to retry the exam
                                    />
                                ) : (
                                    !currentTestQuestion ? (
                                        <p>Loading...</p>  // Show loading state if the current question is not ready
                                    ) : (
                                        <ActiveQuiz
                                            questionNumber={ExamActiveQuestionNumber + 1}  // Display current question number
                                            question={currentTestQuestion.question}  // Display the current question
                                            image={currentTestQuestion.imagen}  // Display the question image (if any)
                                            answers={currentTestQuestion}  // Pass answers for the current question
                                            onAnswerClick={onAnswerClickHandler}  // Handle answer selection
                                            answerState={ExamAnswerState}  // Current answer state
                                            quizLength={Exam.length}  // Total number of questions in the exam
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </Box>
            )}
        </>
    )
}

export default withRouter(ExamComponent)
