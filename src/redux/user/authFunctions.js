import axios from "../../axios/axios-quiz"
import { authSucceed, autoLogout, deleteName, updateName } from '../../redux/user/authTokenSlice.js'
import { createError } from "../error/errorSlice"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function auth(email, password, isLogIn){
    return async dispatch => {
        
        try{

            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const time = user["stsTokenManager"]
                const expirationDate = new Date(time["expirationTime"])
                
                //Token
                user.getIdToken().then((value) => { 
                    localStorage.setItem("token", value)
                    dispatch(authSucceed(value))
                })

                //Time
                const expiration =(expirationDate.getTime() - Date.now()) / 1000
                localStorage.setItem("expirationDate", expiration)
                dispatch(autologout(expiration))
    

                //Name
                localStorage.setItem("displayName", user.displayName)
                dispatch(updateName(user.displayName))

            })
            .catch((error) => {
                const errorMessage = error.message;
                dispatch(createError(errorMessage))
            });
            
            const authData = {
                email,
                password,
                returnSecureToken: true
            }

            // const FIREBASE_API_KEY = import.meta.env.VITE_APP_FIREBASE_API_KEY
            // const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`
            // const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`

            // const response = await axios.post(isLogIn ? loginUrl : signUpUrl, authData)
            // const data = response.data
            // const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
            // console.log(expirationDate)

            // console.log(expirationDate)

            // localStorage.setItem("token", data.idToken)
            // localStorage.setItem("expirationDate", expirationDate)
            // localStorage.setItem("displayName", data.displayName)

            // dispatch(authSucceed(data.idToken))
            // dispatch(autologout(data.expiresIn))
            // dispatch(updateName(data.displayName))

        }catch(error){
            dispatch(createError(error.response.data.error.message))
        }

    }
}

export function signup( name, lastName, email, password, bio, formation, admin, account, isLogIn) {
    return async dispatch => {
        try{
            
            const authData = {
                name,
                lastName,
                email,
                password,
                bio,
                formation,
                admin,
                account
            }

            const authData2 = {
                displayName: name + " " + lastName,
                email,
                password,
                returnSecureToken: true
            }

            const FIREBASE_API_KEY = import.meta.env.VITE_APP_FIREBASE_API_KEY
            
            const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`
            const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`

            const response = await axios.post(isLogIn ? loginUrl : signUpUrl, authData2)            
            const response2 = await axios.post('users.json', authData)

            const data = response.data
            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem("token", data.idToken)
            localStorage.setItem("expirationDate", expirationDate)
            localStorage.setItem("displayName", data.displayName)

            dispatch(authSucceed(data.idToken))
            dispatch(autologout(data.expiresIn))
            dispatch(updateName(data.displayName))
            dispatch(autoLogin())

        }catch(error){
            dispatch(createError(error.response.data.error.message))
        }
    }
}

export function autoLogin(){
    return async dispatch => {
        const token = localStorage.getItem("token")
        const expirationDate = new Date(localStorage.getItem("expirationDate"))
        const displayName = localStorage.getItem('displayName')

        if(!token || expirationDate <= new Date()){
            dispatch(logout())
        }else{
            dispatch(authSucceed(token))
            dispatch(autologout((expirationDate.getTime() - new Date().getTime()) / 1000))
            dispatch(updateName(displayName))
        }
    }

}

export function autologout(timeInSeconds){
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, timeInSeconds * 1000)
    }
}

export function logout(){
    
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("displayName")
    
    return dispatch => {
        dispatch(autoLogout())
        dispatch(deleteName())
    }

}

