//dependencies
import React, { useState, useEffect }  from "react"
import { NavLink } from "react-router-dom"  // NavLink to handle routing

//styles
import styles from '../styles/Card.module.css'  // Styles for the card component
import classes from "../styles/ExamList.module.css"  // Styles for the exam list page

//components
import Loader from "../utils/Loader"  // Loader component to show loading state
import Alert from '../utils/Snackbar'  // Alert component to show errors
import Navbar from "../utils/Navbar"  // Navbar component

//contexts
import { useExam } from "../contexts/ExamContext"
import { useInteraction } from "../contexts/InteractionContext"

const examList = () => {

    // Destructure required values from context
    const { fetchExams, ExamResponse } = useExam()
    const { error, loading } = useInteraction()


    // Use effect hook to fetch exams when the component mounts
    useEffect(() => {
        fetchExams()  // Fetch exams on initial render
    }, [])  // Empty dependency array ensures this runs only once

    const loader = loading  // Store loading state in a variable

    // Function to render the list of quizzes
    const renderQuizList = () => {
        return (
            <>  
                {   
                    // Map through the keys of ExamResponse and render each quiz
                    Object.keys(ExamResponse).map(quiz => {
                        return (
                            // NavLink to navigate to the quiz detail page
                            <NavLink 
                                key={quiz} 
                                to={"/exams/" + quiz} 
                                style={{ width:'100%', height:'100%', textDecoration: 'none', textAlign: '-webkit-center' }}
                            >
                                <div >
                                    <div className={styles.card}>
                                        {/* Render quiz image */}
                                        <img 
                                            className={styles.cardImage} 
                                            src={ExamResponse[quiz].imagen} 
                                            alt={ExamResponse[quiz].subject}
                                        />
                                        
                                        <div className={styles.cardInfoContainer}>
                                            {/* Render quiz subject */}
                                            <h3 className={styles.cardInfoh3}>
                                                {ExamResponse[quiz].subject}
                                            </h3>

                                            <div style={{ width: "278px", textAlign: 'left', color: 'gray' }}>
                                                {/* Render number of questions if available */}
                                                {ExamResponse[quiz].preguntas ? `${ExamResponse[quiz].preguntas.length} preguntas.` : null }
                                              
                                                <br/>
                                                <br/>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        );
                    })
                }
                <br/>
                <br/>
                <br/>
                <br/>
                
            </>
        )
    };

    // If the data is still loading or there's no ExamResponse, show the loader
    if (!loader && !ExamResponse) {
        return (
            <Loader />  // Display the loader component
        )
    }

    return (
        <>
            <Navbar className="mt-[-4rem] z-[1]" />  {/* Navbar with specific styles */}
            <div className={classes.QuizList}>  {/* Main container for the quiz list */}
                {/* Show an alert if there's an error */}
                {error ? <Alert severity={5} title={"Error"} detail={error}/> : null}
                <div className="row cards" style={{ height: '95%', position: 'absolute' }}>
                    <div className="col-lg-4 col-md-7 col-sm-12" style={{ paddingTop: '2rem' , paddingBottom: '100px' }}>
                        {/* Heading for the quiz list */}
                        <h1 className="card-header col-lg-4 col-md-7 col-sm-12">Final Test</h1>
                        
                        <div className="row">
                            <div className="card col-lg-4 col-md-12 col-sm-12">
                                {/* Subheading for the tests */}
                                <h2 className="card-title col-lg-4 col-md-7 col-sm-12" style={{ color: 'white', fontWeight: '300' }}>
                                    Tests
                                </h2>
                                <div>
                                    {/* Horizontal line */}
                                    <hr style={{ margin: '30px 0' }} />
                                    {/* Check if ExamResponse exists, then render the quiz list */}
                                    { !ExamResponse ? null : 
                                        <div className={styles.readthedocs}>
                                            {renderQuizList()}  {/* Render the list of quizzes */}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default examList  // Export the examList component
