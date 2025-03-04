//dependencies
import React, { useState, useEffect } from "react";

//styles
import classes from "../styles/QuizCreator.module.css";

//components
import Button from "../components/Button"

//utils
import { createControl, isFromValid, isValueValid } from "../utils/formFramework";
import Auxiliary from "../utils/Auxiliary"
import Select from "../utils/Select"
import Input from "../utils/Input"
import Alert from '../utils/Snackbar'

//contexts
import { useContextPilotPass } from "../contexts/Context";

const quizCreator = () => {

    const {error, CreatorResponse, createSubject, postSubject, resetResponse, deleteError } = useContextPilotPass()
    
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
            createSubject(course)
            postSubject(course)
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
                deleteError()
            })
        }

        if(CreatorResponse){
            sleep(5000).then( r => {
                resetResponse()
            })
        }

    }, [error, CreatorResponse]);

    return(
        <div className={classes.QuizCreator}>
            <div >
                {error ? <Alert severity={5} title={"Error"} detail={error}/> : null} 
                {CreatorResponse ? <Alert severity={1} title={"Response"} detail={CreatorResponse}/> : null} 
                <h1>Create a Quiz</h1>
                <div>

                  {/*Question */}
                  <Auxiliary>
                        <Input
                            value={subject}
                            label={"Subject"}
                            shouldValidate={false}
                            onChange={event => setsubject(event.target.value)}
                            errorMessage = {"Answer text is Empty"}
                        />
                        <hr style={{ marginBottom: '1rem'}}/> 
                    </Auxiliary>
                    
                    {/*Question */}
                    <Auxiliary>
                        <Input
                            value={question}
                            label={"Question"}
                            shouldValidate={false}
                            onChange={event => setquestion(event.target.value)}
                            errorMessage = {"Answer text is Empty"}
                        />
                
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
                    </Auxiliary>

                    {/*Answer B */}
                    <Auxiliary>
                        <Input
                            value={answer2}
                            label={"Answer B"}
                            shouldValidate={false}
                            onChange={event => setanswer2(event.target.value)}
                            errorMessage = {"Answer text is Empty"}
                        />
                    </Auxiliary>

                    {/*Answer C */}
                    <Auxiliary>
                        <Input
                            value={answer3}
                            label={"Answer C"}
                            shouldValidate={false}
                            onChange={event => setanswer3(event.target.value)}
                            errorMessage = {"Answer text is Empty"}
                        />
                    </Auxiliary>

                    {/*Answer D */}
                    <Auxiliary>
                        <Input
                            value={answer4}
                            label={"Answer D"}
                            shouldValidate={false}
                            onChange={event => setanswer4(event.target.value)}
                            errorMessage = {"Answer text is Empty"}
                        />
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
                        <Button
                            type="primary"
                            onClick={addQuestionHandler}
                            // disabled={isFormValid}
                            >
                            Add Subject Question &nbsp;&nbsp;<i className="fa fa-plus-circle" />
                        </Button>
                    
                        <Button
                            type="success"
                            onClick={onSubmitHandler}
                            disabled={questions.length === 0}
                            style={{marginRight: '0'}}
                            >
                            Save the Subject
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default quizCreator