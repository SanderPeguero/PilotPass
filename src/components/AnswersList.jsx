//dependencies
import React from "react";

//styles
import classes from "../styles/AnswersList.module.css"

//components
import AnswerItem from "./AnswerItem";

const AnswersList = (props) => {

    const answer1 = props.answers['answer1']
    const answer2 = props.answers['answer2']
    const answer3 = props.answers['answer3']
    const answer4 = props.answers['answer4']

    let answers = []
    
    if(answer4 != ''){
        
       answers = [answer1, answer2, answer3, answer4]
       
    }else{
       
        answers = [answer1, answer2, answer3]
        
    }
    
    return(
        <ul className={classes.AnswersList}>
            {
                answers.map((values, index, answer) => {
                    index += 1 
                    return (
                        <AnswerItem
                            key={index}
                            answer={values}
                            id={index.toString()}
                            onAnswerClick={props.onAnswerClick}
                            answerState={props.answerState ? props.answerState[index] : null}
                        />
                    )
                })
            }
        </ul>
    );
}

export default AnswersList;
