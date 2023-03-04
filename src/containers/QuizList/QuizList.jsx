import React  from "react"
import store from "../../redux/store"
import styles from './Card.module.css'
import {NavLink} from "react-router-dom"
import { useSelector } from "react-redux"
import classes from "./QuizList.module.css"
import Loader from "../../components/Loader/Loader"
import Alert from '../../components/Alert/Snackbar'
import Navbar from "../../components/Navigation/navbar"


const quizList = () => {

    const loader = store.getState().loading.loading
    const error = useSelector(state => state.error.error);
    const response = useSelector(state => state.courses.response)
    
    
    const renderQuizList = () => {
        return (
            <>  
                {   
                    Object.keys(response).map(quiz => {
                        return (
                            <NavLink key={quiz} to={"/quiz/" + quiz} style={{width:'100%', height:'100%', textDecoration: 'none', textAlign: '-webkit-center'}}>
                                <div >
                                    <div className={styles.card}>
                                        <img className={styles.cardImage} src={response[quiz].imagen} alt={response[quiz].subject}/>
                                        
                                        <div className={styles.cardInfoContainer}>
                                            
                                            <h3 className={styles.cardInfoh3}>
                                                {response[quiz].subject}
                                            </h3>

                                            <div style={{ width: "278px", textAlign: 'left', color: 'gray'}}>
                                                {response[quiz].preguntas ? `${response[quiz].preguntas.length} preguntas.` : null }
                                              
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

    if(!loader && !response){
        return(
            <Loader/>
        )
    }

    return(
        <>
            <Navbar className="mt-[-4rem] z-[1]"/>
            <div className={classes.QuizList}>
                {error ? <Alert severity={5} title={"Error"} detail={error}/> : null}
                <div className="row cards" style={{ height:'95%', position:'absolute'}}>
                <div className="col-lg-4 col-md-7 col-sm-12" style={{ paddingTop: '2rem' , paddingBottom: '100px'}}>
                    <h1 className="card-header col-lg-4 col-md-7 col-sm-12">My Courses</h1>
                    
                    <div className="row">
                        <div className="card col-lg-4 col-md-12 col-sm-12"  >
                        <h2 className="card-title col-lg-4 col-md-7 col-sm-12" style={{color:'white', fontWeight:'300'}}>Private Pilot</h2>
                        
                        <div>
                            <hr style={{margin:'30px 0'}}/>
                            {
                                    !response ? 
                                    null : 
                                    <div className={styles.readthedocs}>
                                        {renderQuizList()}
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

export default quizList