import React from "react";
import classes from "./AnswerItem.module.css"

const AnswerItem = props => {
    
    const classNames = [classes.AnswerItem];
    if (props.answerState)
        classNames.push(classes[props.answerState]);

    return (
        <li className={classNames.join(" ")} onClick={() => props.onAnswerClick(props.id)}>
            <div className="form-check" style={{margin:'5px', display: '-webkit-inline-box', alignItems: 'center'}} >
                <div>
                    {props.answer}
                </div>
            </div>
            
        </li>
    );
};

export default AnswerItem;