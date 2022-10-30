import { connect } from 'react-redux'
import { Component } from 'react'
import { isFromValid, isValueValid } from '../../form/formFramework'
import { auth } from '../../store/actions/authActions'
import Input from './Input'
import classes from './Input.module.css'
import './Login.css'
import { NavLink } from 'react-router-dom'

function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched
}

class Login extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email:{

                value: "",
                type: "email",
                label: "Email",
                errorMessage: "Invalid Email",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            
            password:{
                value: "",
                type: "password",
                label: "Password",
                errorMessage: "Password Must Have 8 Characters or More",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    submitHandler = event => {
        event.preventDefault()
    }

    onChangeHandler = ( event, controlName ) => {
        const formControls = {...this.state.formControls}
        const formControl = {...formControls[controlName]}

        formControl.value = event.target.value
        formControl.touched = true
        formControl.valid = isValueValid(formControl.value, formControl.validation)

        formControls[controlName] = formControl
        this.setState({
            formControls: formControls,
            isFormValid: isFromValid(formControls) //AWKWARD NAMING "isFromValid"
        })
    }

    

    renderInputs(){
        return Object.keys(this.state.formControls).map((formControlName, index) => {
            
            const formControl = this.state.formControls[formControlName]
            const inputType = formControl.type || "text"
            const htmlFor = `${inputType}-${Math.random()}`
            const errorOcurred = isInvalid(formControl.valid, formControl.touched, Boolean(formControl.validation))

            if(errorOcurred){
                classNames.push(classes.invalid)
            }
            
            return(
                <div className="user-box" key={formControlName + index + 1}>
                    <Input
                        key={formControlName + index}
                        type={formControl.type}
                        value={formControl.value}
                        label={formControl.label}
                        errorMessage={formControl.errorMessage}
                        valid={formControl.valid}
                        touched={formControl.touched}
                        shouldValidate={Boolean(formControl.validation)}
                        onChange={event => this.onChangeHandler(event, formControlName)}
                    />
{/*                 
                    <input 
                        type={formControl.type} 
                        id={htmlFor} 
                        value={formControl.value} 
                        onChange={event => this.onChangeHandler(event, formControlName)}
                    />
                    {
                        errorOcurred
                        ? <span>{formControl.errorMessage || "Enter valid data"}</span>
                        : null
                    }
                    <label htmlFor={htmlFor}>{formControl.label}</label> */}
                    {/* <label>Username</label> */}

                </div>

            )
        })
    }

    render(){
        return(
            <div className='login-box'>
                <h2>Login</h2>
                <form action="" onSubmit={this.submitHandler}>
                    {this.renderInputs()}
                    <div>
                        <a href="#" onClick={this.loginHandler}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Log In
                        </a>
                        <NavLink to="/signup" style={{ marginLeft: '5.8rem', background: 'black'}}>
                            Sign Up
                        </NavLink>
                    </div>
                </form>
            </div>
        )
    }
}

const Logins = () => {
    
    return(
        <div className="login-box">
            <h2>Login</h2>
            <form>
                <div className="user-box">
                    <input type="text" name="" required=""/>
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input type="password" name="" required=""/>
                    <label>Password</label>
                </div>
                <div >
                    <a href="#" >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Log In
                    </a>
                    <Link to="/signup" style={{ marginLeft: '5.8rem', background: 'black'}}>
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    )

}

function mapDispatchToProps(dispatch){
    return{
        auth: (email, password, isLogIn) => dispatch(auth(email, password, isLogIn))
    }
}

export default connect(null, mapDispatchToProps)(Login)