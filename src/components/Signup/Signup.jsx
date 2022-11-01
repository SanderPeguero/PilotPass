import { connect } from 'react-redux'
import { Component } from 'react'
import { signup } from '../../store/actions/authActions'
import { isFromValid, isValueValid } from '../../form/formFramework'
import Input from './Input'

function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched
}

class Signup extends Component{
    
    state = {
        isFormValid: false,
        formControls: {

            userName:{
                value: '',
                type: 'username',
                label: 'Username',
                errorMessage: '',
                valid: false,
                touched: false,
                validation: {
                    required: false
                }
            },

            name: {
                value: '',
                type: 'name',
                label: 'Name',
                errorMessage: '',
                valid: false,
                touched: false,
                validation: {
                    required: false
                }
            },

            lastName: {
                value: '',
                type: 'lastname',
                label: 'Last Name',
                errorMessage: '',
                valid: false,
                touched: false,
                validation: {
                    required: false
                }
            },

            email:{
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Invalid Email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            }, 

            password:{
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Password Must Have 8 Characters or More',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            },
            
            admin:{
                value: false,
                show: false
            },

            account: {
                value: 1,
                show: false
            }

        }
    }

    signUpHandler = () => {
        this.props.signup(
            this.state.formControls.userName,
            this.state.formControls.name,
            this.state.formControls.lastName,
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            this.state.formControls.admin,
            this.state.formControls.account,
            false
        )
    }

    submitHandler = event => {
        event.preventDefault()
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const formControl = {...formControls[controlName]}

        formControl.value = event.target.value
        formControl.touched = true
        formControl.valid = isValueValid(formControl.value, formControl.validation)

        formControls[controlName] = formControl
        this.setState({
            formControls: formControls,
            isFormValid: isFromValid(formControls)
        })
    }

    renderInputs(){
        
        return Object.keys(this.state.formControls).map((formControlName, index) => {
            
            const formControl = this.state.formControls[formControlName]
            if(formControl.show == false){
                return
            }
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
                </div>
            )
        })
    }

    render(){

        return(

            <div className="login-box">
                <h2>Sign Up</h2>
                <form onSubmit={this.submitHandler}>
                    {this.renderInputs()}
                    <div>
                        <a href="#" onClick={this.signUpHandler}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Sign Up
                        </a>
                    </div>
                </form>
            </div> 
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        signup: (userName,name, lastName, email,password, isLogin ) => dispatch(signup(userName, name, lastName, email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Signup)
