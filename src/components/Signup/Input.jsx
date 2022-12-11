import classes from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched
}

const Input = props => {
    
    const inputType = props.type || "text"
    const classNames = [classes.Input]
    // const classNames = []
    const htmlFor = `${inputType}-${Math.random()}`
    const errorOcurred = isInvalid(props)

    if(errorOcurred){
        classNames.push(classes.invalid)
    }

    return (
        <fieldset className={classNames.join(" ")}>
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
        </fieldset>
    )
}

export default Input