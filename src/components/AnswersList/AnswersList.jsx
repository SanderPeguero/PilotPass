import React from "react";
import classes from "./AnswersList.module.css"
import AnswerItem from "../AnswerItem/AnswerItem";
import { useDispatch } from "react-redux";

const AnswersList = (props) => {

    const answer1 = props.answers['answer1']
    const answer2 = props.answers['answer2']
    const answer3 = props.answers['answer3']
    const answer4 = props.answers['answer4']
    
    const answers = []
    
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
                            answerState={props.answerState ? props.answerState[answer.id] : null}
                        />
                    )
                })
            }
        </ul>
    );
}

export default AnswersList;
