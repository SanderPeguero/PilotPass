//dependencies
import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'

//styles
import '../styles/Login.css'
import Error from '../styles/Error.module.css'

//components
import Button from "./Button"
import Alert from '../utils/Snackbar'

//utils
import { isValueValid } from '../utils/formFramework'

//contexts
import { useAuth } from '../contexts/AuthContext'
import { useInteraction } from '../contexts/InteractionContext'

const Login = () => {

    // Destructure values from context for authentication and error handling
    const { auth } = useAuth()
    const { error, deleteError } = useInteraction()

    // State for email and password input with validation info
    const classNames = [Error.input] // Class for invalid inputs

    // Email state: stores value, error message, validity, touched status, and validation rules
    const [email, setemail] = useState({
        value: '',
        errorMessage: 'Invalid Email',
        valid: null,
        touched: false,
        validation: {
            required: true,
            email: true
        }
    })

    // Password state: stores value, error message, validity, touched status
    const [password, setpassword] = useState({
        value: '',
        errorMessage: 'Password Must Have 8 Characters or More',
        valid: null,
        touched: false
    })

    // Side effect: Check if email or password are valid whenever they change
    useEffect(() => {
        if(email.value.length > 0){
            // Validate email if input is not empty
            setemail({...email, valid: isValueValid(email.value, email.validation)})
        }
        if(password.value.length > 0){
            // Validate password if input is not empty
            setpassword({...password, valid: isValueValid(password.value, password.validation)})
        }
    }, [email.value, password.value])

    // Side effect: Handle error display and automatic error deletion after 10 seconds
    useEffect(() => {
        if(error) {
            const timeout = setTimeout(() => deleteError(), 10000) // Delete error after 10 seconds
            return () => clearTimeout(timeout); // Clean up timeout on component unmount
        }
    }, [error, deleteError])

    // Handler: Update input state (value, validity, touched) when input changes
    const onChangeHandler = (event, state, setState) => {
        setState({
            ...state, 
            value: event.target.value, // Update input value
            touched: true, // Mark input as touched
            valid: isValueValid(event.target.value, state.validation) // Validate input value
        })
    }

    // Handler: Trigger authentication with email and password
    function loginHandler(){
        auth(email.value, password.value, true)
    }

    return (
        <div className="h-25 row">
            {/* Display error message if exists */}
            {error && <Alert severity={5} title={"Error"} detail={error} />}
            
            <div className='form' style={{margin: '10rem auto'}}>
                <h1> Login </h1>
                <div className='row'>
                    <fieldset className='col' style={{ marginBottom: '0'}}>
                        {/* Email input field */}
                        <div className={classNames}>
                            <label htmlFor="email">Email:</label>
                            <input 
                                style={ email.valid === false ? { border: "1.5px solid rgb(252 0 34)" } : null }
                                type="email" 
                                id="email" 
                                name="user_email" 
                                onChange={(event) => onChangeHandler(event, email, setemail)} // Update state on input change
                            />
                            {/* Display email error message if invalid */}
                            {email.valid === false && <span>{email.errorMessage || "Enter valid data"}</span>}
                        </div>
                        
                        {/* Password input field */}
                        <div className={classNames}>
                            <label htmlFor="password">Password:</label>
                            <input 
                                style={ password.valid === false ? { border: "1.5px solid rgb(252 0 34)" } : null }
                                type="password" 
                                id="password" 
                                name="user_password" 
                                onChange={(event) => onChangeHandler(event, password, setpassword)} // Update state on input change
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        loginHandler(); // Trigger login on pressing "Enter"
                                    }
                                }}
                            />
                            {/* Display password error message if invalid */}
                            {password.valid === false && <span>{password.errorMessage || "Enter valid data"}</span>}
                        </div>
                    </fieldset>
                </div>

                {/* Login button */}
                <Button 
                    onClick={loginHandler} 
                    type="primary" 
                    style={{border: 'none', fontSize: '18px'}}
                >
                    Login
                </Button>

                {/* Link to the signup page */}
                <div style={{marginBottom: '1rem'}}>
                    Don't have an account yet? 
                    <NavLink style={{color: '#69c9ef', textDecoration: 'none'}} to='/signup'>
                        Create account
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Login;
