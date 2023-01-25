import React, { useEffect } from "react";
import {NavLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./QuizList.module.css";
import { fetchQuizList } from "../../redux/courses/functions";
import Loader from "../../components/UI/Loader/Loader";
import Alert from '../../components/Alert/Snackbar'
import { fetchResponse } from "../../redux/courses/functions";
import { db } from '../../firebase/firebase'
import { ref, onValue } from 'firebase/database'
import { getAuth } from "firebase/auth";

import styles from './Card.module.css'


const quizList = () => {
    
    const courses = useSelector(state => state.courses);
    const quizlist = useSelector(state => state.courses.quizList);
    const isLoading = useSelector(state => state.courses);
    const error = useSelector(state => state.error.error);
    const response = useSelector(state => state.courses.response)

    const dispatch = useDispatch();
    
    useEffect(() => {
        
        dispatch(fetchQuizList())

        // const starCountRef = ref(db, 'quizList/');
        // const auth = getAuth()

        // onValue(starCountRef, (snapshot) => {
        //     const data = snapshot.val();
        //     dispatch(fetchResponse(data))

        // });

<<<<<<< develop
=======
class QuizList extends Component {

    componentDidMount() {
        this.props.fetchQuizList();
    }

    renderQuizList() {
        return this.props.quizList.map(quiz => {
            return (
                    <li key={quiz.id} className="list-group-item" style={{width:'100%', height:'100%', display:'flex'}}>
                        <input className="form-check-input check" type="checkbox" id={quiz.id} disabled style={{width:"50px", height:'25px', float: "left"}}/>
                        <NavLink to={"/quiz/" + quiz.id} style={{width:'100%', height:'100%'}}>
                            {quiz.name}
                        </NavLink>
                        
                    </li>
            );
        });
    };
>>>>>>> jhon-albert

        // const starCountRef = ref(db, 'quizList/');
        // const auth = getAuth();
      
        // onValue(starCountRef, (snapshot) => {
        //     const data = snapshot.val();
        //     console.log(data)
        //     dispatch(fetchResponse(data))

        // });

    }, []);

    const renderQuizList = () => {
        return (
<<<<<<< develop
            <>   
                {
                    Object.keys(response).map(quiz => {
                        return (
                                // <li key={quiz.id} className="list-group-item" style={{width:'100%', height:'100%', display:'flex'}}>
                                //     <input className="form-check-input check" type="checkbox" id={quiz.id} disabled style={{width:"50px", height:'25px', float: "left"}}/>
                                    
                                    
                                // </li>

                            <NavLink key={quiz} to={"/quiz/" + quiz} style={{width:'100%', height:'100%', textDecoration: 'none'}}>
                                <div >
                                    <div className={styles.card}>
                                        <img className={styles.cardImage} src={response[quiz].imagen} alt={response[quiz].subject}/>
                                        
                                        <div className={styles.cardInfoContainer}>
                                            
                                            <h3 className={styles.cardInfoh3}>
                                            {response[quiz].subject}
                                            </h3>

                                            <div style={{ width: "278px", textAlign: 'left', color: 'gray'}}>
                                                
                                                {response[quiz].preguntas ? `${response[quiz].preguntas.length} preguntas.` : null }
                                                {/* {console.log(response[quiz].preguntas)} */}
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

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    useEffect(() => {
        
        if(error){
            sleep(5000).then( r => {
                dispatch(deleteError())
            })
        }

    }, [error]);

    return(
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
                            courses.isLoading && courses.quizList.length > 0
                                ? <Loader/>
                                : <div className={styles.readthedocs}>
                                    {renderQuizList()}
                                </div>
                        }
                    </div>
=======
            <div className={classes.QuizList} style={{ width:'93%', position:'relative', left:'7%'}}>
                <div className="row justify-content-end" style={{ width:'95%'}}>
                <div className="col-lg-6 col-md-12 col-sm-12" style={{borderRadius:'none'}}>
                    <h1 className="card-header col-lg-6 col-md-7 col-sm-12">My Courses</h1>
                    
                    <div className="row">
                        <div className="card col-lg-12 col-md-12 col-sm-12" style={{ width:'95%', position:'relative', left:'-1%'}} >
                        <h2 className="card-title" style={{color:'white', fontWeight:'300'}}>Private Pilot</h2>
                        
                        <div className="card-body " >
                            <hr style={{margin:'30px 0'}}/>
                            {
                                this.props.isLoading && this.props.quizList.length > 0
                                    ? <Loader/>
                                    : <ul className="list-group list-group-flush ">
                                        {this.renderQuizList()}
                                    </ul>
                            }
                        </div>
                        </div>
>>>>>>> jhon-albert
                    </div>
                </div>
            </div>
            </div>
        </div> 
    )
}

export default quizList