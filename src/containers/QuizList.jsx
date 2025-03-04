//dependencies
import React from "react"
import { NavLink } from "react-router-dom" // Used for routing between different quiz pages

//styles
import styles from '../styles/Card.module.css' // Import custom styles for the card
import classes from "../styles/QuizList.module.css" // Import styles specific to the QuizList component

//utils
import Loader from "../utils/Loader"; // Loader component to show while data is being fetched
import Alert from '../utils/Snackbar'; // Alert component for displaying error messages
import Navbar from "../utils/Navbar"; // Navbar component for navigation

//contexts
import { useInteraction } from "../contexts/InteractionContext";
import { useQuiz } from "../contexts/QuizContext";

// Main QuizList component
const QuizList = () => {

    // Destructure necessary states from the context
    const { loading, error } = useInteraction()
    const { response } = useQuiz()

    // Function to render the quiz list for each course
    const renderQuizList = (course) => {
        const quizlist = response[course]; // Get the list of quizzes for the current course
        
        return (
            <>
                {
                    // Map over all quizzes in the course and render each one as a card
                    Object.keys(quizlist).map((quiz) => {
                        const quizData = quizlist[quiz]; // Get the current quiz data
                        
                        // Check if the quiz data is valid and return a quiz card
                        if (quizData && typeof quizData === 'object') {
                            return (
                                <NavLink
                                    key={quiz} // Use quiz ID as the key for the NavLink
                                    to={`/quiz/${course}/${quiz}`} // Route to the specific quiz
                                    style={{ width: '100%', height: '100%', textDecoration: 'none', textAlign: '-webkit-center' }}
                                >
                                    <div>
                                        <div className={styles.card}>
                                            {/* Render quiz image */}
                                            <img className={styles.cardImage} src={quizData.imagen} alt={quizData.subject} />
                                            
                                            <div className={styles.cardInfoContainer}>
                                                {/* Render quiz subject */}
                                                <h3 className={styles.cardInfoh3}>
                                                    {quizData.subject}
                                                </h3>
                                                
                                                <div style={{ width: "278px", textAlign: 'left', color: 'gray' }}>
                                                    {/* Render number of questions in the quiz */}
                                                    {quizData.preguntas ? `${quizData.preguntas.length} preguntas.` : null}
                                                    <br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            );
                        }
                        return null; // If quiz data is not valid, return nothing
                    })
                }
                <br /><br /><br /><br />
            </>
        );
    };

    // Render courses and their corresponding quizzes
    const renderCourses = () => {
        return (
            <>
                {/* Future course-related rendering logic can be added here */}
            </>
        );
    };

    // If data is still loading or response is empty, show the loader
    if (loading || !response) {
        return <Loader />;
    }

    return (
        <>
            {/* Navbar is displayed at the top */}
            <Navbar className="mt-[-4rem] z-[1]" />
            
            <div className={classes.QuizList}>
                {/* Show error alert if there was an error fetching the quizzes */}
                {error && <Alert severity={5} title={"Error"} detail={error} />}
                
                <div className="row cards" style={{ height: '95%', position: 'absolute' }}>
                    {/* Display the courses and their quizzes */}
                    <div className="col-lg-4 col-md-7 col-sm-12" style={{ paddingTop: '2rem', paddingBottom: '100px' }}>
                        {/* Display title for the courses section */}
                        <h1 className="card-header col-lg-4 col-md-7 col-sm-12">My Courses</h1>
                        
                        <div className="row">
                            {
                                // Iterate through all available courses
                                Object.keys(response).map((course) => {
                                    const courseData = response[course]; // Get the course data
                                    
                                    return (
                                        <div key={course} className="card col-lg-4 col-md-12 col-sm-12 mb-8">
                                            {/* Render the course name */}
                                            <h2 className="card-title col-lg-4 col-md-7 col-sm-12" style={{ color: 'white', fontWeight: '300' }}>
                                                {courseData.subject}
                                            </h2>
                                            
                                            <div>
                                                <hr style={{ margin: '30px 0' }} />
                                                
                                                {/* Render the quizzes of the course */}
                                                <div className={styles.readthedocs}>
                                                    {renderQuizList(course)}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuizList;
