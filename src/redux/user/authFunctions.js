import axios from "../../axios/axios-quiz"
import { authSucceed, autoLogout, deleteName, updateName, AccountsAllowed } from '../../redux/user/authTokenSlice.js'
import { createError } from "../error/errorSlice"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


export function auth(email, password, isLogIn) {
    return async dispatch => {

        try {

            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const time = user["stsTokenManager"]
                    const expirationDate = new Date(time["expirationTime"])
                    // console.log(userCredential)
                    //Token
                    user.getIdToken().then((value) => {
                        localStorage.setItem("token", value)
                        dispatch(authSucceed(value))
                    })

                    //Time
                    const expiration = (expirationDate.getTime() - Date.now()) / 1000
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

        } catch (error) {
            dispatch(createError(error.response.data.error.message))
        }

    }
}

export function signup(name, lastName, email, password, bio, formation, admin, account, isLogIn) {
    return async dispatch => {
        try {
            
            // const authData2 = {
                //     displayName: name + " " + lastName,
                //     email,
                //     password,
                //     returnSecureToken: true,
                // }
                
            const auth1 = getAuth()

            const inforuser = await createUserWithEmailAndPassword(
                auth1,
                email,
                password
            ).then((user) => {

                const expirationDate = new Date(new Date().getTime() + user._tokenResponse.expiresIn * 1000)
                localStorage.setItem("token", user._tokenResponse.idToken)
                localStorage.setItem("expirationDate", expirationDate)
                localStorage.setItem("displayName", name + " " + lastName)
                // localStorage.setItem("phoneNumber", user.user.phoneNumber)

                updateProfile(
                    auth1.currentUser,
                    { displayName: name + " " + lastName }
                )
                
                const dataid = user.user.uid
                const db = getDatabase()
                
                set(ref(db, 'users/' + dataid), {
                    name: name,
                    lastName: lastName,
                    email: email,
                    password: password,
                    bio: bio,
                    formation: formation,
                    admin: admin,
                    account: account
                })

                dispatch(autologout(user._tokenResponse.expiresIn))
                dispatch(autoLogin())
            })

            // console.log(inforuser)
            // const auth2 = getAuth()
            

            // const FIREBASE_API_KEY = import.meta.env.VITE_APP_FIREBASE_API_KEY
            // const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`
            //const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`
            //const response = await axios.post(isLogIn ? loginUrl : signUpUrl, authData2)     
            // const response = await axios.post(loginUrl, authData2)
            // const data = response.data

            // Jose Alberto
            // dispatch(autologout(data.expiresIn))
            // inforuser.user.getIdToken().then((value) => {
            //     localStorage.setItem("token", value)
            //     dispatch(authSucceed(value))
            // })
            // dispatch(updateName(authData2.displayName))

            // dispatch(authSucceed(data.idToken))
            // dispatch(autologout(inforuser.user.))

            // const authData = {
            //     data: {

            //     }
            // }



            // const response2 = await axios.post(`users.json/${inforuser.user.uid}`, authData)



            // dispatch(authSucceed(data.idToken))
            // dispatch(autologout(data.expiresIn))
            // dispatch(updateName(data.displayName))
            // dispatch(AccountsAllowed(account))
            // dispatch(autoLogin())



            // const FIREBASE_API_KEY = import.meta.env.VITE_APP_FIREBASE_API_KEY

            // const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`
            // const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`

            // const response = await axios.post(isLogIn ? loginUrl : signUpUrl, authData2)            
            // const response2 = await axios.post('users.json', authData)

            // const data = response.data
            // const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

            // const auth1 = getAuth()



            //     console.log("id sig: " + inforuser.user.uid)
            // localStorage.setItem("token", data.idToken)
            // localStorage.setItem("expirationDate", expirationDate)
            // localStorage.setItem("displayName", data.displayName)
            // localStorage.setItem("phoneNumber", data.phoneNumber)

            // console.log("Este es el nombre: " + data.displayName)
            // console.log("Este es el numero: " + account)


            // dispatch(authSucceed(data.idToken))
            // dispatch(autologout(data.expiresIn))
            // dispatch(updateName(data.displayName))
            // dispatch(AccountsAllowed(account))
            // dispatch(autoLogin())

        } catch (error) {
            dispatch(createError(error))
        }
    }
}

export function autoLogin() {
    return async dispatch => {
        
        const token = localStorage.getItem("token")
        const displayName = localStorage.getItem('displayName')

        const actual = new Date()
        const expiration = new Date().getTime() + (localStorage.getItem("expirationDate") * 1000)
        const expirationDate = new Date(expiration)

        if (!token || expirationDate <= actual) {
            dispatch(logout())
        } else {
            dispatch(authSucceed(token))
            dispatch(autologout((expirationDate.getTime() - new Date().getTime()) / 1000))
            dispatch(updateName(displayName))
        }
    }

}

export function autologout(timeInSeconds) {
    return dispatch => {
        // console.log(timeInSeconds)
        setTimeout(() => {
            dispatch(logout())
        }, timeInSeconds * 1000)
    }
}

export function logout() {

    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("displayName")


    return dispatch => {
        dispatch(autoLogout())
        dispatch(deleteName())
    }

}

