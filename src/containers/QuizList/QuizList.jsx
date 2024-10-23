import React from "react"
import store from "../../redux/store"
import styles from './Card.module.css'
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import classes from "./QuizList.module.css"
import Loader from "../../components/Loader/Loader"
import Alert from '../../components/Alert/Snackbar'
import Navbar from "../../components/Navigation/navbar"


const quizList = () => {

    const loader = store.getState().loading.loading
    const error = useSelector(state => state.error.error);
    const response = useSelector(state => state.courses.response)

    // console.log(response)

    const renderQuizList = (course) => {

        const quizlist = response[course]
        
        
        return (
            <>
                {
                    Object.keys(quizlist).map(quiz => {
                        
                        console.log(quizlist[quiz])
                        
                        if (typeof quizlist[quiz] === 'object') {
                            
                            return (
                                <NavLink key={quiz} to={"/quiz/" + course + "/" + quiz} style={{ width: '100%', height: '100%', textDecoration: 'none', textAlign: '-webkit-center' }}>
                                    <div >
                                        <div className={styles.card}>
                                            <img className={styles.cardImage} src={quizlist[quiz].imagen} alt={quizlist[quiz].subject} />

                                            <div className={styles.cardInfoContainer}>

                                                <h3 className={styles.cardInfoh3}>
                                                    {quizlist[quiz].subject}
                                                </h3>

                                                <div style={{ width: "278px", textAlign: 'left', color: 'gray' }}>
                                                    {quizlist[quiz].preguntas ? `${quizlist[quiz].preguntas.length} preguntas.` : null}

                                                    <br />
                                                    <br />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            );
                        }
                    })
                }
                <br />
                <br />
                <br />
                <br />

            </>
        )
    };

    const renderCourses = () => {
        return (
            <>
                {

                }
            </>
        )
    }

    if (!loader && !response) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <Navbar className="mt-[-4rem] z-[1]" />
            <div className={classes.QuizList}>
                {error ? <Alert severity={5} title={"Error"} detail={error} /> : null}
                <div className="row cards" style={{ height: '95%', position: 'absolute' }}>
                    <div className="col-lg-4 col-md-7 col-sm-12" style={{ paddingTop: '2rem', paddingBottom: '100px' }}>
                        <h1 className="card-header col-lg-4 col-md-7 col-sm-12">My Courses</h1>

                        <div className="row">
                            {
                                Object.keys(response).map(course => {

                                    return (
                                        <div key={course} className="card col-lg-4 col-md-12 col-sm-12 mb-8"  >
                                            <h2 className="card-title col-lg-4 col-md-7 col-sm-12" style={{ color: 'white', fontWeight: '300' }}>{response[course].subject}</h2>
                                            <div>
                                                <hr style={{ margin: '30px 0' }} />
                                                {
                                                    !response ?
                                                        null :
                                                        <div className={styles.readthedocs}>
                                                            {renderQuizList(course)}
                                                        </div>
                                                }
                                            </div>
                                        </div>                                        
                                    )
                                }
                                )
                            }
                            {/* <div className="card col-lg-4 col-md-12 col-sm-12"  >
                                <h2 className="card-title col-lg-4 col-md-7 col-sm-12" style={{ color: 'white', fontWeight: '300' }}>Private Pilot</h2>

                                <div>
                                    <hr style={{ margin: '30px 0' }} />
                                    {
                                        !response ?
                                            null :
                                            <div className={styles.readthedocs}>
                                                {renderQuizList()}
                                            </div>
                                    }
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default quizList