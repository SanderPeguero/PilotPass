import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./QuizCreator.module.css";
import { createControl, isFromValid, isValueValid } from "../../form/formFramework";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select"
import { createSubject, resetResponse } from "../../redux/creator/slice"
import { postSubject } from "../../redux/creator/functions"
import Alert from '../../components/Alert/Snackbar'

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

                    <div style={{display: 'flex'}}>
                        {/* <Tooltip title="Add Quiz"> */}
                            {/* <span> */}
                                <Button
                                    type="primary"
                                    onClick={addQuestionHandler}
                                    // disabled={isFormValid}
                                    >
                                    Add Subject Question &nbsp;&nbsp;<i className="fa fa-plus-circle" />
                                </Button>
                            {/* </span> */}
                        {/* </Tooltip> */}
                        {/* <Tooltip title="Save"> */}
                            {/* <span> */}
                                <Button
                                    type="success"
                                    onClick={onSubmitHandler}
                                    disabled={questions.length === 0}
                                    style={{marginRight: '0'}}
                                    >
                                    Save the Subject
                                </Button>
                            {/* </span> */}
                        {/* </Tooltip> */}
                    </div>


                </div>
            </div>
        </div>
    )

}

export default quizCreator