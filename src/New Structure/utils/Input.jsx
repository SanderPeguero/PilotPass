import { useId } from 'react';
import classes from '../styles/Input.module.css'

function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched
}

const Input = props => {
    
    const inputType = props.type || "text"
    const classNames = [classes.Input]
    const generatedId = useId();
    const htmlFor = `${inputType}-${generatedId}`
    const errorOcurred = isInvalid(props)

    if(errorOcurred){
        classNames.push(classes.invalid)
    }

    return (
        <div className={classNames.join(" ")}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {
                errorOcurred
                    ? <span>{props.errorMessage || "Enter valid data"}</span>
                    : null
            }
        </div>
    )
}

export default Input