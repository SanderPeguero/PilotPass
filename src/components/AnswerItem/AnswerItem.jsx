import React from "react";
import classes from "./AnswerItem.module.css"

const AnswerItem = props => {
    
    const classNames = [classes.AnswerItem];
    if (props.answerState)
        classNames.push(classes[props.answerState]);

    return (
        <li className={classNames.join(" ")} onClick={() => props.onAnswerClick(props.id)}>

            <div className="form-check" style={{margin:'5px', display: '-webkit-inline-box', alignItems: 'center'}} >
                <input className="`form-check-input" type="radio" name="flexRadioDefault" id={props.id} style={{width:'20px', height:'20px'}}></input>
                <div>
                    {props.answer}
                </div>
            </div>
            
        </li>
    );
};

export default AnswerItem;