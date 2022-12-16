import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
// import { fetchQuizById, quizAnswerClick, retryQuiz } from "../../store/actions/quizActions";
import { fetchQuizById, quizAnswerClick, retryQuiz } from "../../redux/courses/functions";
import { useParams } from "react-router-dom";
import { Avatar, Box, Grid, Modal, Stack } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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

    // console.log(List)
    const name = () => {
        
        let n = ''

        List.map( obj => {
            // console.log(obj["id"] == props.match.params.id)
            obj["id"] == props.match.params.id ? n = obj.name : null

        })

        return n

    }


    //Component did mount
    useEffect(() => {

        dispatch(fetchQuizById(props.match.params.id))
        
    }, []);

    //Component will unmount
    // useEffect(() => {

    //     return () => {

    //         dispatch(fetchQuizById(props.match.params.id))
    //         dispatch(retryQuiz())

    //     }
        
    // }, []);

    
    const onAnswerClickHandler = answerId => {
        dispatch(quizAnswerClick(answerId))
    }

    // console.log(currentQuizQuestion)

    return (
        <Box className={classes.Quiz}>
            {/* <div className={classes.QuizWrapper}> */}
                <div className="row cards col-lg-4 col-md-7 col-sm-12">
                    {/* <div className="container col-lg-4 col-md-7 col-sm-12" style={{borderRadius:'0'}}> */}

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
                    {/* </div> */}
                {/* </div> */}
            </div>
        </Box>
    )
}

export default withRouter(Quiz)

//  class Quiz extends React.Component {

//     componentDidMount() {
//         this.props.fetchQuizById(this.props.match.params.id);
//     }

//     componentWillUnmount() {
//         this.props.retryQuiz();
//     }

//     onAnswerClickHandler = answerId => {
//         this.props.quizAnswerClick(answerId);
//     };

//     render() {
//         return (
            
//             <Box className={classes.Quiz}>
//                 <div className={classes.QuizWrapper}>
//                     <div className="row">
//                     <div className="container col-lg-4 col-md-7 col-sm-12" style={{borderRadius:'0'}}>

//                         <div className="card-header col-lg-4 col-md-7 col-sm-12" style={{color:'white', margin: "2%"}}>
//                             <h2 className="col-lg-4 col-md-7 col-sm-12">Exam Name</h2>
//                         </div>

//                         <div className="card col-lg-4 col-md-7 col-sm-12">
//                             <div className="card-header">
//                                 <p className="row" style={{color:'white'}}> 
//                                     <span className="">Question {this.props.activeQuestionNumber + 1}</span>  
//                                     <span className="" style={{float:'right'}}>1:43:00</span> 
//                                 </p>
//                             </div>
//                             <hr />

//                             <div>
//                                 {
//                                     this.props.isLoading || !this.props.quiz
//                                     ? <Loader />
//                                     :
//                                     this.props.isQuizFinished
//                                     ? 
                                
//                                         <FinishedQuiz
//                                         results={results}
//                                         quiz={quiz}
//                                         onRetry={retryQuiz}

//                                     />
                                    
//                                     : <ActiveQuiz
//                                         questionNumber={this.props.activeQuestionNumber + 1}
//                                         question={this.props.currentQuizQuestion.question}
//                                         answers={this.props.currentQuizQuestion.answers}
//                                         onAnswerClick={this.onAnswerClickHandler}
//                                         answerState={this.props.answerState}
//                                         quizLength={this.props.quiz.length}
//                                     />
//                                 }
//                             </div>
//                         </div>
//                         </div>
//                     </div>
                    

//                 </div>
//             </Box>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return {
//         activeQuestionNumber: state.currentQuiz.activeQuestionNumber,
//         isQuizFinished: state.currentQuiz.isQuizFinished,
//         answerState: state.currentQuiz.answerState, // { [id]: "success"/"error" } - current state
//         results: state.currentQuiz.results, // { [id]: "success"/"error" } - all first states
//         quiz: state.currentQuiz.quiz,
//         currentQuizQuestion: state.currentQuiz.currentQuizQuestion,
//         isLoading: state.currentQuiz.isLoading
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         fetchQuizById: quizId => dispatch(fetchQuizById(quizId)),
//         quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
//         retryQuiz: () => dispatch(retryQuiz())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz));