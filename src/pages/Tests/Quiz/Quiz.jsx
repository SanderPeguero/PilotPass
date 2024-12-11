import { Box } from "@mui/material"; // Material-UI Box component for layout
import classes from "./Quiz.module.css"; // Import styles for the Quiz component
import { useParams } from "react-router-dom"; // For accessing dynamic URL parameters
import React, { useEffect, useState } from "react"; // React hooks for managing state and side-effects
import ActiveQuiz from "../../../components/ActiveQuiz/ActiveQuiz"; // Component for showing an active quiz question
import FinishedQuiz from "../../../components/FinishedQuiz/FinishedQuiz"; // Component for displaying quiz results

import { useContextPilotPass } from "../../../Context"; // Custom context for global state management

// Higher-order component to access route parameters using useParams
export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() }; // Getting URL params (course and quiz ID)
        return <Children {...props} match={match} />;
    };
}

const Quiz = (props) => {
    // Destructure context values to manage quiz state
    const {
        fetchStart,
        fetchQuizList,
        fetchQuizById,
        fetchStop,
        quiz,
        retryQuiz,
        results,
        response,
        isLoading,
        answerState,
        isQuizFinished,
        quizAnswerClick,
        currentQuizQuestion,
        activeQuestionNumber
    } = useContextPilotPass();

    // Fetch quiz data on component mount or when response changes
    useEffect(() => {
        // If no response exists, start fetch process and fetch quiz list
        if (!response) {
            fetchStart();
            fetchQuizList();
        } else if (response) {
            // Fetch quiz by course and quiz ID from URL params
            fetchQuizById(props.match.params.course, props.match.params.id);
            fetchStop(); // Stop loading after fetch is complete
            fetchStop(); // Prevent additional fetch calls
        }
        // Add event listener to alert user before leaving the page (for unsaved data)
        window.addEventListener("beforeunload", alertUser);
    }, [response]);

    // Cleanup function when the component unmounts
    useEffect(() => {
        // Clear quiz retry state and remove the unload event listener to prevent memory leaks
        return () => {
            retryQuiz(); // Reset quiz state
            window.removeEventListener("beforeunload", alertUser); // Cleanup event listener
        };
    }, []);

    // Alert the user before they leave the page with unsaved data
    const alertUser = (e) => {
        e.preventDefault(); // Prevent default behavior (to show alert message)
    };

    // Timer initialization
    const THREE_DAYS_IN_MS = 2 * 3600 * 1000; // Set the timer for two hours (2 * 3600 * 1000)
    const [timer, settimer] = useState(THREE_DAYS_IN_MS); // Manage timer state
    const minutes = Math.floor((timer % 3600000) / 60000); // Calculate minutes remaining
    const seconds = Math.floor((timer % 60000) / 1000); // Calculate seconds remaining
    const hours = Math.floor((timer / 1000) / 3600); // Calculate hours remaining
    const MINUTE_MS = 1000; // One second interval for the timer

    // Timer effect to count down every second
    useEffect(() => {
        // If timer is greater than zero, set an interval to decrement timer every second
        if (timer > 0) {
            const interval = setInterval(() => {
                let times = timer;
                settimer(times - 1000); // Decrement the timer by one second
            }, MINUTE_MS);
            // Cleanup function to clear interval on component unmount or timer update
            return () => clearInterval(interval);
        } else {
            console.log("Time is over!"); // Log when time is up
        }
    }, [timer]);

    // Handler when the user clicks on an answer
    const onAnswerClickHandler = (answerId) => {
        quizAnswerClick(answerId); // Update the state with the selected answer
    };

    return (
        <>
            {/* If quiz data is not available, return null */}
            {!quiz ? null : (
                <Box className={classes.Quiz}>
                    <div className="row cards col-lg-4 col-md-7 col-sm-12" style={{ paddingTop: '2rem', paddingBottom: '100px' }}>
                        <div className="card-header col-lg-4 col-md-7 col-sm-12" style={{ color: 'white', margin: "2%" }}>
                            {/* Header is empty, could display the quiz title here if needed */}
                        </div>

                        <div className="card col-lg-4 col-md-7 col-sm-12">
                            <div className="card-header">
                                <p className="row" style={{ color: 'white' }}>
                                    {/* Display the current question number and the time left */}
                                    <span className="">Question {activeQuestionNumber + 1} / {quiz.length}</span>
                                    <span className="" style={{ float: 'right' }}>
                                        {/* Show countdown timer */}
                                        {timer > 1 ? `Time Left: ${hours}:${minutes}:${seconds}` : "TIME IS OVER"}
                                    </span>
                                </p>
                            </div>
                            <hr />

                            <div>
                                {/* If quiz is loading or quiz data is not available, show nothing */}
                                {
                                    isLoading || !quiz
                                        ? null
                                        : // If quiz is finished, show FinishedQuiz component, otherwise show ActiveQuiz component
                                        isQuizFinished
                                            ? <FinishedQuiz
                                                results={results} // Show quiz results
                                                quiz={quiz} // Provide the quiz data
                                                onRetry={retryQuiz} // Provide retry functionality
                                              />
                                            : <ActiveQuiz
                                                questionNumber={activeQuestionNumber + 1} // Show current question number
                                                question={currentQuizQuestion.question} // Display the current question
                                                image={currentQuizQuestion.imagen} // Display any associated image
                                                answers={currentQuizQuestion} // Provide possible answers for the question
                                                onAnswerClick={onAnswerClickHandler} // Handle answer selection
                                                answerState={answerState} // Display the state of the selected answer
                                                quizLength={quiz.length} // Provide the total number of questions
                                              />
                                }
                            </div>
                        </div>
                    </div>
                </Box>
            )}
        </>
    );
};

export default withRouter(Quiz); // Wrap the component with router HOC to access route params
