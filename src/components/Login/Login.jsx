import { useDispatch, useSelector } from 'react-redux'
import { isFromValid, isValueValid } from '../../form/formFramework'
import { useState, useEffect } from 'react'
import { deleteError } from '../../redux/error/errorSlice'
import { NavLink } from 'react-router-dom'
import { auth } from '../../redux/user/authFunctions'
import Error from './Error.module.css'
import Alert from '../../components/Alert/Snackbar'
import './Login.css'

// function isInvalid({valid, touched, shouldValidate}){
//     return !valid && shouldValidate && touched
// }

const login = () => {

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
        touched: false
    });

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

    let classNames = [Error.input]
    const dispatch = useDispatch()

    const error = useSelector(state => state.error.error)

    const onChangeHandler = (event, state, setState) => {
        
        setState({...state, 
            'value': event.target.value,
            'touched': true,
            'valid': isValueValid(state.value, state.validation)
        })

    }

    function loginHandler(){
        dispatch(auth(email.value, password.value, true))
        // try{
        //     dispatch(auth(email.value, password.value, true))
        // }catch(e){
        //     console.log(e)
        // }
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
                <h1> Login </h1>
                <div className='row'>
                    
                    <fieldset className='col'>

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
                        
                    </fieldset>

                </div>

                <button onClick={loginHandler}>Login</button>
                <div style={{marginBottom: '1rem'}}>Dont have an accoung yet? <NavLink style={{color: '#82d99b', textDecoration: 'none'}} to='/signup'>create account</NavLink></div>
                
            </div>
        </div>
    )
}

export default login