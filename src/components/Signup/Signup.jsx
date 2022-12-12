import { connect } from 'react-redux'
import { Component } from 'react'
import { signup } from '../../store/actions/authActions'
import { isFromValid, isValueValid } from '../../form/formFramework'
import Input from './Input'
import './signup.css'

function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched
}

class Signup extends Component{
    
    state = {
        isFormValid: false,
        formControls: {

            // userName:{
            //     value: '',
            //     type: 'username',
            //     label: 'Username',
            //     errorMessage: '',
            //     valid: false,
            //     touched: false,
            //     validation: {
            //         required: false
            //     }
            // },

            name: {
                value: '',
                type: 'text',
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
                type: 'text',
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

            bio:{
                value: '',
                show: false
            },

            formation:{
                value: 'student',
                show: false
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
            // this.state.formControls.userName.value,
            this.state.formControls.name.value,
            this.state.formControls.lastName.value,
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            this.state.formControls.bio.value,
            this.state.formControls.formation.value,
            this.state.formControls.admin.value,
            this.state.formControls.account.value,
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
        console.log("Control Name: " + controlName)
        console.log("Value: " + formControl.value)
        formControl.touched = true
        formControl.valid = isValueValid(formControl.value, formControl.validation)

        formControls[controlName] = formControl
        this.setState({
            formControls: formControls,
            isFormValid: isFromValid(formControls)
        })
    }

    // onChangeSelect = (event, controlName) => {
    //     const formControls = {...this.state.formControls}
    //     const formControl = {...formControls[controlName]}

    //     formControl.value = event.target.value
    //     formControl.touched = true
    //     formControl.valid = isValueValid(formControl.value, formControl.validation)

    //     formControls[controlName] = formControl
    //     this.setState({
    //         formControls: formControls,
    //         isFormValid: isFromValid(formControls)
    //     })
    // }

    renderInputs(){
        
        return Object.keys(this.state.formControls).map((formControlName, index) => {
            
            const formControl = this.state.formControls[formControlName]
            if(formControl.show == false){
                return
            }
            // const inputType = formControl.type || "text"
            // const htmlFor = `${inputType}-${Math.random()}`
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

            <div className="h-25 row">
                <form onSubmit={this.submitHandler} className="form">
                    <h1>Sign Up</h1>
                    <fieldset>
                        <legend><span className="number">1</span> Account</legend>
                        {this.renderInputs()}
                    </fieldset>
                    <fieldset className='col'>  
                        
                            <legend><span className="number">2</span> Your Profile</legend>
                            
                            <label htmlFor="bio">Bio:</label>
                            <textarea id="bio" name="user_bio" onChange={event => this.onChangeHandler(event, "bio")}></textarea>
                            
                            
                            <label htmlFor="formation">Formation:</label>
                            <select id="formation" name="user_formation" value={this.state.formControls.formation.value} onChange={event => this.onChangeHandler(event,"formation")}>
                                <optgroup label="Initial">
                                    <option value="student">Student</option>
                                    <option value="student_pilot">Student Pilot</option>
                                    <option value="sport_pilot">Sport Pilot</option>
                                    <option value="private_pilot">Private Pilot</option>
                                    <option value="private_pilot_IFR">Private Pilot IFR</option>
                                    <option value="private_pilot_multi_engine">Private Pilot Multi Engine</option>
                                </optgroup>
                                <optgroup label="Middle">
                                    <option value="private_pilot_multi_engine_IFR">Private Pilot Multi Engine IFR</option>
                                    <option value="commertial_pilot">Commertial Pilot</option>
                                    <option value="commertial_pilot_IFR">Commertial Pilot IFR</option>
                                    <option value="commertial_pilot_multi_engine">Commertial Pilot Multi Engine</option>
                                    <option value="commertial_pilot_multi_engine_IFR">Commertial Pilot Multi Engine IFR</option>
                                    <option value="certified_flight_instructor_VFR">Certified Flight Instructor VFR</option>
                                </optgroup>
                                <optgroup label="Advance">
                                    <option value="certified_flight_instructor_IFR">Certified Flight Instructor IFR</option>
                                    <option value="certified_flight_instructor_multi_engine">Certified Flight Instructor Multi Engine</option>
                                    <option value="certified_flight_instructor_multi_engine_IFR">Certified Flight Instructor Multi Engine IFR</option>
                                    <option value="airline_transport_pilot">Airline Transport Pilot</option>
                                    <option value="airline_transport_pilot_IFR">Airline Transport Pilot IFR</option>
                                    <option value="airline_transport_pilot_multi_engine_IFR">Airline Transport Pilot Multi Engine IFR</option>
                                </optgroup>
                            </select>
                            
                            {/* <label>Interests:</label>
                            <input type="checkbox" id="development" value="interest_development" name="user_interest"/><label className="light" htmlFor="development">Development</label><br/>
                            <input type="checkbox" id="design" value="interest_design" name="user_interest"/><label className="light" htmlFor="design">Design</label><br/>
                            <input type="checkbox" id="business" value="interest_business" name="user_interest"/><label className="light" htmlFor="business">Business</label>
                                */}
                        </fieldset>
                    {/* <div>
                        <NavLink to="/tests" onClick={this.signUpHandler}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Sign Up
                        </NavLink>
                    </div> */}
                    <button onClick={this.signUpHandler} type="submit">Sign Up</button>
                </form>
            </div> 
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        signup: (name, lastName, email,password, bio, formation, admin, account, isLogin ) => dispatch(signup( name, lastName, email, password, bio, formation, admin, account, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Signup)
