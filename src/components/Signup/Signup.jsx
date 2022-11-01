import { connect } from 'react-redux'
import { Component } from 'react'
import { isFromValid, isValueValid } from '../../form/formFramework'
import { auth } from '../../store/actions/authActions'
import { createauth } from '../../store/actions/userAction'
import Input from '../Login/Input'


function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched
}

class Signup extends Component {
    state = {
        isFormValid: false,
        formControls: {
            name:{

                value: "",
                type: "name",
                label: "Name",
                errorMessage: "Invalid Name",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    name: true
                }
            },

            lastname:{

                value: "",
                type: "lastname",
                label: "Last Name",
                errorMessage: "Invalid Last Name",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    lastname: true
                }
            },

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
        this.props.createauth(
            this.state.formControls.name.value,
            this.state.formControls.lastname.value,
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

                </div>

            )
        })
    }

    render(){
        return(
            <div className='login-box'>
                <h2> Sign Up</h2>
                <form action="" onSubmit={this.submitHandler}>
                    {this.renderInputs()}
                    <div>
                        <a href="#" onClick={this.loginHandler}>
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
        createauth: (name,lastname,email, password, isLogIn) => dispatch(createauth(name,lastname,email, password, isLogIn))
    }
}

export default connect(null, mapDispatchToProps)(Signup)



// const Signup = () => {
//     return(
//         <div className="login-box">
//             <h2>Sign Up</h2>
//             <form>
//                 <div className="user-box">
//                     <input type="name" name="" required=""/>
//                     <label>Name</label>
//                 </div>
//                 <div className="user-box">
//                     <input type="lastname" name="" required=""/>
//                     <label>Last Name</label>
//                 </div>
//                 <div className="user-box">
//                     <input type="email" name="" required=""/>
//                     <label>Email</label>
//                 </div>
//                 <div className="user-box">
//                     <input type="text" name="" required=""/>
//                     <label>Username</label>
//                 </div>
//                 <div className="user-box">
//                     <input type="password" name="" required=""/>
//                     <label>Password</label>
//                 </div>
//                 <div>
//                     <a href="#" >
//                         <span></span>
//                         <span></span>
//                         <span></span>
//                         <span></span>
//                         Sign Up
                        
//                     </a>
//                 </div>
//             </form>
//         </div>
//     )
// }

