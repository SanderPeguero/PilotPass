import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./QuizCreator.module.css";
import { createControl, isFromValid, isValueValid } from "../../form/formFramework";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
// import { createQuizQuestion, createQuiz } from "../../store/actions/quizCreatorActions";
import { createSubject, resetResponse } from "../../redux/creator/slice";
import { Tooltip } from "@mui/material";
import { postSubject } from "../../redux/creator/functions";
import Alert from '../../components/Alert/Snackbar'

// function createFormControls() {
//     return {
//         question: createControl({
//             label: "Question",
//             errorMessage: "Question text is Empty"
//         }, { required: true }),

//         option1: createOptionControl(1, "A"),
//         option2: createOptionControl(2, "B"),
//         option3: createOptionControl(3, "C"),
//         option4: createOptionControl(4, "D"),
//     };
// }

// function createOptionControl(optionNumber, label) {
//     return createControl({
//         id: optionNumber,
//         label: `Answer ${label})`,
//         errorMessage: "Answer text is Empty"
//     }, { required: true })
// }


const quizCreator = () => {
    
    const [subject, setsubject] = useState("")
    const [question, setquestion] = useState("")
    const [answer1, setanswer1] = useState("")
    const [answer2, setanswer2] = useState("")
    const [answer3, setanswer3] = useState("")
    const [answer4, setanswer4] = useState("")
    const [correctAnswer, setcorrectAnswer] = useState("1")
    const [questions, setquestions] = useState([]);
    const [course, setcourse] = useState({
        "subject": '',
        "preguntas": []
    })
    const dispatch = useDispatch();
    const error = useSelector(state => state.error.error);
    const response = useSelector(state => state.creator.response);
    
    const pregunta = {
        question,
        answer1,
        answer2,
        answer3,
        answer4,
        correctAnswer
    }

    const addQuestionHandler = () => {
        
        
        if(question.length > 0 && answer1.length > 0 && answer2.length > 0 && answer3.length > 0 && answer4.length > 0 && correctAnswer > 0){
            
            questions.push(pregunta)  
            console.log(questions)
            setquestion("")
            setanswer1("")
            setanswer2("")
            setanswer3("")
            setanswer4("")
            setcorrectAnswer(1)

        }
        
    }

    const onSubmitHandler = () => {
        
        if(subject.length > 0 && course.subject == ""){
            
            course.subject = subject
            console.log("Se seteo el Subject linea:92")

        }

        if(course["subject"].length > 0 && questions.length > 0){

            setcourse(course.preguntas = questions)
            dispatch(createSubject(course))
            dispatch(postSubject(course))
            setquestions([])
            setcourse({
                "subject": '',
                "preguntas": []
            })

        }
    }

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    useEffect(() => {
        
        if(error){
            sleep(5000).then( r => {
                dispatch(deleteError())
            })
        }

        if(response){
            sleep(5000).then( r => {
                dispatch(resetResponse())
            })
        }

    }, [error, response]);

    return(
        <div className={classes.QuizCreator}>
            <div >
                {error ? <Alert severity={5} title={"Error"} detail={error}/> : null} 
                {response ? <Alert severity={1} title={"Response"} detail={response}/> : null} 
                <h1>Create a Quiz</h1>
                <div>

                    {/* {this.renderInputs()} */}

                  {/*Question */}
                  <Auxiliary>
                        <Input
                            // type={course.subject}
                            value={subject}
                            label={"Subject"}
                            shouldValidate={false}
                            onChange={event => setsubject(event.target.value)}
                            errorMessage = {"Answer text is Empty"}
                        />
                         {/* <Select
                            label="Subject"
                            value={pregunta.correctAnswer}
                            onChange={event => setcorrectAnswer(event.target.value)}
                            options={[
                                { text: "Meteorologia", value: 1 },
                                { text: "Navegacion", value: 2 },
                                { text: "Aerodinamica", value: 3 },
                                { text: "Sistemas de Aeronaves", value: 4 }
                            ]}
                        /> */}
                        <hr style={{ marginBottom: '1rem'}}/> 
                    </Auxiliary>
                    
                    {/*Question */}
                    <Auxiliary>
                        <Input
                            // type={pregunta.question}
                            value={question}
                            label={"Question"}
                            shouldValidate={false}
                            onChange={event => setquestion(event.target.value)}
                            errorMessage = {"Answer text is Empty"}
                        />
                    {/* {index === 0 ? <hr /> : null} */}
                    </Auxiliary>
                    

                     {/*Answer A */}
                     <Auxiliary>
                        <Input
                            // type={pregunta.answer1}
                            value={answer1}
                            label={"Answer A"}
                            shouldValidate={false}
                            onChange={event => setanswer1(event.target.value)}
                            errorMessage = {"Answer text is Empty"}
                        />
                    {/* {index === 0 ? <hr /> : null} */}
                    </Auxiliary>

                       {/*Answer B */}
                       <Auxiliary>
                        <Input
                            // type={pregunta.answer2}
                            value={answer2}
                            label={"Answer B"}
                            shouldValidate={false}
                            onChange={event => setanswer2(event.target.value)}
                            errorMessage = {"Answer text is Empty"}
                        />
                    {/* {index === 0 ? <hr /> : null} */}
                    </Auxiliary>

                       {/*Answer C */}
                       <Auxiliary>
                        <Input
                            // type={pregunta.answer3}
                            value={answer3}
                            label={"Answer C"}
                            shouldValidate={false}
                            onChange={event => setanswer3(event.target.value)}
                            errorMessage = {"Answer text is Empty"}
                        />
                    {/* {index === 0 ? <hr /> : null} */}
                    </Auxiliary>

                       {/*Answer D */}
                       <Auxiliary>
                        <Input
                            // type={pregunta.answer4}
                            value={answer4}
                            label={"Answer D"}
                            shouldValidate={false}
                            onChange={event => setanswer4(event.target.value)}
                            errorMessage = {"Answer text is Empty"}
                        />
                    {/* {index === 0 ? <hr /> : null} */}
                    </Auxiliary>
                    
                    <Select
                        label="Right Answer"
                        value={correctAnswer}
                        onChange={event => setcorrectAnswer(event.target.value)}
                        options={[
                            { text: "A", value: 1 },
                            { text: "B", value: 2 },
                            { text: "C", value: 3 },
                            { text: "D", value: 4 }
                        ]}
                    />

                    <Tooltip title="Add Quiz">
                        <span>
                            <Button
                                type="primary"
                                onClick={addQuestionHandler}
                                // disabled={isFormValid}
                                >
                                Add Quiz Question &nbsp;&nbsp;<i className="fa fa-plus-circle" />
                            </Button>
                        </span>
                    </Tooltip>
                    <Tooltip title="Save">
                        <span>
                            <Button
                                type="success"
                                onClick={onSubmitHandler}
                                // disabled={this.props.quiz.length === 0}
                                >
                                Create the Quiz
                            </Button>
                        </span>
                    </Tooltip>

                </div>
            </div>
        </div>
    )

}

export default quizCreator





























// class QuizCreator extends Component {

//     state = {
//         rightAnswerId: 1,
//         formControls: createFormControls(),
//         isFormValid: false
//     };

//     submitHandler = event => {
//         event.preventDefault();
//     };

//     addQuestionHandler = () => {
//         const { question, option1, option2, option3, option4 } = this.state.formControls;
//         const quizItem = {
//             question: question.value,
//             id: this.props.quiz.length + 1,
//             rightAnswerId: this.state.rightAnswerId,
//             answers: [
//                 { text: option1.value, id: option1.id },
//                 { text: option2.value, id: option2.id },
//                 { text: option3.value, id: option3.id },
//                 { text: option4.value, id: option4.id }
//             ]
//         };

//         this.setState({
//             rightAnswerId: 1,
//             formControls: createFormControls(),
//             isFormValid: false
//         });

//         this.props.createQuizQuestion(quizItem);
//     };

//     createQuizHandler = () => {
//         this.setState({
//             rightAnswerId: 1,
//             formControls: createFormControls(),
//             isFormValid: false
//         });

//         this.props.createQuiz();
//     };

//     onChangeHandler = (value, controlName) => {
//         const formControls = { ...this.state.formControls };
//         const formControl = { ...formControls[controlName] };

//         formControl.value = value;
//         formControl.touched = true;
//         formControl.valid = isValueValid(formControl.value, formControl.validation);

//         formControls[controlName] = formControl;
//         this.setState({
//             formControls: formControls,
//             isFormValid: isFromValid(formControls)
//         })
//     };

//     selectChangeHandler = event => {
//         this.setState({
//             rightAnswerId: Number(event.target.value)
//         });
//     };

//     renderInputs() {
//         return Object.keys(this.state.formControls).map((formControlName, index) => {
//             const formControl = this.state.formControls[formControlName];
//             return (
//                 <Auxiliary key={formControlName + index}>
//                     <Input
//                         type={formControl.type}
//                         value={formControl.value}
//                         label={formControl.label}
//                         errorMessage={formControl.errorMessage}
//                         valid={formControl.valid}
//                         touched={formControl.touched}
//                         shouldValidate={Boolean(formControl.validation)}
//                         onChange={event => this.onChangeHandler(event.target.value, formControlName)}
//                     />
//                     {index === 0 ? <hr /> : null}
//              </Auxiliary>
//             );
//         });
//     };

//     render() {
//         const select = <Select
//             label="Right Answer"
//             value={this.state.rightAnswerId}
//             onChange={this.selectChangeHandler}
//             options={[
//                 { text: "A", value: 1 },
//                 { text: "B", value: 2 },
//                 { text: "C", value: 3 },
//                 { text: "D", value: 4 }
//             ]}
//         />;
        
//         const ref = React.createRef()

//         return (
//             <div className={classes.QuizCreator}>
//                 <div>
//                     <h1>Create a Quiz</h1>
//                     <form onSubmit={this.submitHandler}>

//                         {this.renderInputs()}

//                         {select}
//                         <Tooltip title="Add Quiz">
//                             <span>
//                                 <Button
//                                     type="primary"
//                                     onClick={this.addQuestionHandler}
//                                     disabled={!this.state.isFormValid}
//                                     >
//                                     Add Quiz Question &nbsp;&nbsp;<i className="fa fa-plus-circle" />
//                                 </Button>
//                             </span>
//                         </Tooltip>
//                         <Tooltip title="Save">
//                             <span>
//                                 <Button
//                                     type="success"
//                                     onClick={this.createQuizHandler}
//                                     disabled={this.props.quiz.length === 0}
//                                     >
//                                     Create the Quiz
//                                 </Button>
//                             </span>
//                         </Tooltip>

//                     </form>
//                 </div>
//             </div>
//         );
//     };
// }

// function mapStateToProps(state) {
//     return {
//         quiz: state.quizCreator.quiz
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         createQuizQuestion: quizItem => dispatch(createQuizQuestion(quizItem)),
//         createQuiz: () => dispatch(createQuiz())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);