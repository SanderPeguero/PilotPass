import React, {Component, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import classes from "./QuizList.module.css";
// import {fetchQuizList} from "../../store/actions/quizActions";
import { fetchQuizList } from "../../redux/courses/functions";
import Loader from "../../components/UI/Loader/Loader";
import Alert from '../../components/Alert/Snackbar'


const quizList = () => {
    
    const courses = useSelector(state => state.courses);
    const quizlist = useSelector(state => state.courses.quizList);
    const isLoading = useSelector(state => state.courses);
    const error = useSelector(state => state.error.error);

    const dispatch = useDispatch();
    
    useEffect(() => {
        
        dispatch(fetchQuizList())   

    }, []);

    const renderQuizList = () => {
        return quizlist.map(quiz => {
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
            <div className="row justify-content-end" style={{ width:'80%', height:'95%', position:'absolute', left: '12%'}}>
            <div className="col-lg-4 col-md-7 col-sm-12">
                <h1 className="card-header col-lg-4 col-md-7 col-sm-12">My Courses</h1>
                
                <div className="row">
                    <div className="card col-lg-4 col-md-12 col-sm-12"  >
                    <h2 className="card-title col-lg-4 col-md-7 col-sm-12" style={{color:'white', fontWeight:'300'}}>Private Pilot</h2>
                    
                    <div className="card-body col-lg-4 col-md-7 col-sm-12" >
                        <hr style={{margin:'30px 0'}}/>
                        {
                            courses.isLoading && courses.quizList.length > 0
                                ? <Loader/>
                                : <ul className="list-group list-group-flush col-lg-4 col-md-7 col-sm-12">
                                    {renderQuizList()}
                                </ul>
                        }
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div> 
    )
}

export default quizList

// class QuizList extends Component {

//     componentDidMount() {
//         this.props.fetchQuizList();
//     }

//     renderQuizList() {
//         return this.props.quizList.map(quiz => {
//             return (
//                     <li key={quiz.id} className="list-group-item" style={{width:'100%', height:'100%', display:'flex'}}>
//                         <input class="form-check-input check" type="checkbox" id={quiz.id} disabled style={{width:"50px", height:'25px', float: "left"}}/>
//                         <NavLink to={"/quiz/" + quiz.id} style={{width:'100%', height:'100%'}}>
//                             {quiz.name}
//                         </NavLink>
                        
//                     </li>
//             );
//         });
//     };

//     render() {
//         return (
//             <div className={classes.QuizList}>
//                 <div className="row justify-content-end" style={{ width:'80%', height:'95%', position:'absolute', left: '12%'}}>
//                 <div className="col-lg-4 col-md-7 col-sm-12">
//                     <h1 className="card-header col-lg-4 col-md-7 col-sm-12">My Courses</h1>
                    
//                     <div className="row">
//                         <div className="card col-lg-4 col-md-12 col-sm-12"  >
//                         <h2 className="card-title col-lg-4 col-md-7 col-sm-12" style={{color:'white', fontWeight:'300'}}>Private Pilot</h2>
                        
//                         <div className="card-body col-lg-4 col-md-7 col-sm-12" >
//                             <hr style={{margin:'30px 0'}}/>
//                             {
//                                 this.props.isLoading && this.props.quizList.length > 0
//                                     ? <Loader/>
//                                     : <ul className="list-group list-group-flush col-lg-4 col-md-7 col-sm-12">
//                                         {this.renderQuizList()}
//                                     </ul>
//                             }
//                         </div>
//                         </div>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//         );
//     };
// }

// function mapStateToProps(state) {
//     return {
//         quizList: state.currentQuiz.quizList,
//         isLoading: state.currentQuiz.isLoading
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         fetchQuizList: () => dispatch(fetchQuizList())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(QuizList);