import axiosQuiz from "../../axios/axios-quiz"

export function createauth(name, lastname,email, password, isLogIn){
    return async dispatch => {
        const authData = {
            name, 
            lastname,
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

        // localStorage.setItem("token", data.idToken)
        // localStorage.setItem("expirationDate", expirationDate)

        // dispatch(authSucceed(data.idToken))
        // dispatch(autoLogout(data.expiresIn))
    }
}