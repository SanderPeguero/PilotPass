//styles
import classes from '../styles/Button.module.css'

const Button = props => {
    const classNames = [
        classes.Button,
        classes[props.type]
    ]

    return (
        <button
            onClick={props.onClick}
            className={classNames.join(" ")}
            disabled={props.disabled}
            style={props.style}
        >
            {props.children}
        </button>
    )
}

export default Button