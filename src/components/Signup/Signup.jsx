import { isFromValid, isValueValid } from '../../form/formFramework'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { deleteError } from '../../redux/error/errorSlice'
import { signup } from '../../redux/user/authFunctions'
import Error from './Error.module.css'
import Alert from '../../components/Alert/Snackbar'
import './signup.css'

const SignUp = () => {

    const [name, setname] = useState({
        value: '',
        errorMessage: '',
        valid: false,
        touched: false,
        validation: {
            required: false
        }
    });
    const [lastName, setlastName] = useState({
        value: '',
        errorMessage: '',
        valid: false,
        touched: false,
        validation: {
            required: false
        }
    });
    const [email, setemail] = useState({
        value: '',
        errorMessage: 'Invalid Email',
        valid: null,
        touched: false,
        validation: {
            required: true,
            email: true
        }
    });
    const [password, setpassword] = useState({
        value: '',
        errorMessage: 'Password Must Have 8 Characters or More',
        valid: null,
        touched: false,
        validation: {
            required: true,
            minLength: 8
        }
    });
    const [bio, setbio] = useState({ value: ''});
    const [formation, setformation] = useState({ value: 'Student' });
    const [admin, setadmin] = useState(false);
    const [account, setaccount] = useState(1);

    let classNames = [Error.input]

    

    useEffect(() => {
        if(email.value.length > 0){

            setemail({...email,
                'valid': isValueValid(email.value, email.validation)
            })
        }
        if(password.value.length > 0){

            setpassword({...password,
                'valid': isValueValid(password.value, password.validation)
            })
        }

    }, [email.value, password.value]);

    const onChangeHandler = (event, state, setState) => {
        
        setState({...state, 
            'value': event.target.value,
            'touched': true,
            'valid': isValueValid(state.value, state.validation)
        })

    }

    const dispatch = useDispatch()
    const error = useSelector(state => state.error.error)

    function signUpHandler(){
        dispatch(signup( name.value, lastName.value, email.value, password.value, bio.value, formation.value, admin, account, false))
    }

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    useEffect(() => {

        sleep(5000).then( r => {
            dispatch(deleteError())
        })

    }, [error]);
    


    return(
        <div className="h-25 row">
            {error ? <Alert severity={5} title={"Error"} detail={error}/> : null}
            <div className='form'>
                <h1> Sign Up </h1>
                <div className='row'>
                    
                    <fieldset className='col'>
                    
                        <legend><span className="number">1</span> Your Basic Info</legend>
                        
                        <label htmlFor="name" >Name:</label>
                        <input type="text" id="name" name="user_name" value={name.value} onChange={
                            event => onChangeHandler(event,name,setname)
                        }/>

                        <label htmlFor="last_name">Last Name:</label>
                        <input type="text" id="last_name" name="last_name" onChange={
                             event => onChangeHandler(event,lastName,setlastName)
                        }/>

                        <div className={classNames}>
                            <label htmlFor="email">Email:</label>
                            <input style={ (email.valid) == false ? { border: "1.5px solid rgb(252 0 34)" } : null} type="email" id="email" name="user_email" onChange={
                                event => onChangeHandler(event,email,setemail)
                            }/>
                            {
                                (email.valid == false)
                                ? <span>{email.errorMessage || "Enter valid data"}</span>
                                : null
                            }
                        </div>
                        
                        <div className={classNames}>
                            <label htmlFor="password">Password:</label>
                            <input style={ (password.valid) == false ? { border: "1.5px solid rgb(252 0 34)" } : null} type="password" id="password" name="user_password" onChange={
                                event => onChangeHandler(event,password,setpassword)
                            }/>
                            {
                                (password.valid == false)
                                ? <span>{password.errorMessage || "Enter valid data"}</span>
                                : null
                            }
                        </div>
                        
                        
                        {/* <label>Age:</label>
                        <input type="radio" id="under_13" value="under_13" name="user_age"/>
                        <label htmlFor="under_13" className="light">Under 13</label>
                        <br/>
                        <input type="radio" id="over_13" value="over_13" name="user_age"/>
                        <label htmlFor="over_13" className="light">Over 13</label> */}
                        
                    </fieldset>
                    <fieldset className='col'>  
                    
                        <legend><span className="number">2</span> Your Profile</legend>
                        
                        <label htmlFor="bio">Bio:</label>
                        <textarea id="bio" name="user_bio" onChange={
                            event => onChangeHandler(event,bio,setbio)
                        }></textarea>
                        
                        
                        <label htmlFor="formation">Formation:</label>
                        <select id="formation" name="user_formation" value={formation.value} onChange={
                            event => onChangeHandler(event,formation,setformation)
                        }>
                            <optgroup label="Initial">
                                <option value="Student">Student</option>
                                <option value="Student Pilot">Student Pilot</option>
                                <option value="Sport Pilot">Sport Pilot</option>
                                <option value="Private Pilot">Private Pilot</option>
                                <option value="Private Pilot IFR">Private Pilot IFR</option>
                                <option value="Private Pilot Multi Engine">Private Pilot Multi Engine</option>
                            </optgroup>
                            <optgroup label="Middle">
                                <option value="Private Pilot Multi Engine IFR">Private Pilot Multi Engine IFR</option>
                                <option value="Commertial Pilot">Commertial Pilot</option>
                                <option value="Commertial Pilot IFR">Commertial Pilot IFR</option>
                                <option value="Commertial Pilot Multi Engine">Commertial Pilot Multi Engine</option>
                                <option value="Commertial Pilot Multi Engine IFR">Commertial Pilot Multi Engine IFR</option>
                                <option value="Certified Flight Instructor VFR">Certified Flight Instructor VFR</option>
                            </optgroup>
                            <optgroup label="Advance">
                                <option value="Certified Flight Instructor IFR">Certified Flight Instructor IFR</option>
                                <option value="Certified Flight Instructor Multi Engine">Certified Flight Instructor Multi Engine</option>
                                <option value="Certified Flight Instructor Multi Engine IFR">Certified Flight Instructor Multi Engine IFR</option>
                                <option value="Airline Transport Pilot">Airline Transport Pilot</option>
                                <option value="Airline Transport Pilot IFR">Airline Transport Pilot IFR</option>
                                <option value="Airline Transport Pilot Multi Engine IFR">Airline Transport Pilot Multi Engine IFR</option>
                            </optgroup>
                        </select>
                        
                        {/* <label>Interests:</label>
                        <input type="checkbox" id="development" value="interest_development" name="user_interest"/><label className="light" htmlFor="development">Development</label><br/>
                        <input type="checkbox" id="design" value="interest_design" name="user_interest"/><label className="light" htmlFor="design">Design</label><br/>
                        <input type="checkbox" id="business" value="interest_business" name="user_interest"/><label className="light" htmlFor="business">Business</label>
                            */}
                    </fieldset>
                </div>
            
                <button onClick={signUpHandler}>Sign Up</button>
                
            </div>
        </div>
    )
} 

export default SignUp
