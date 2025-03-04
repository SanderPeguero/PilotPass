import React, { createContext, useContext, useState } from 'react';

import { getDatabase, ref, set, onValue } from "firebase/database"
import { db } from '../services/firebase'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useInteraction } from './InteractionContext'

// Crear el contexto
const AuthContext = createContext();

// Crear el Provider del contexto
export const AuthProvider = ({ children }) => {

    const { createError } = useInteraction()
    const [authToken, setauthToken] = useState(null);
    const [name, setname] = useState(null);
    const [accountsallowed, setaccountsallowed] = useState(null);

    //Reducers
    const authSucceed = (data) => setauthToken(data);
    const updateName = (data) => setname(data);
    const deleteName = () => setname(null);

    //Functions
    const auth = (email, password, isLogIn) => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const expirationDate = new Date(user["stsTokenManager"]["expirationTime"]);

                user.getIdToken().then((token) => {
                    localStorage.setItem("token", token);
                    authSucceed(token);
                });

                const expiration = (expirationDate.getTime() - Date.now()) / 1000;
                localStorage.setItem("expirationDate", expiration);
                autoLogout(expiration);

                localStorage.setItem("displayName", user.displayName);
                updateName(user.displayName);
            })
            .catch((error) => {
                createError(error.message);
            });
    };

    async function signup(name, lastName, email, password, bio, formation, admin, account, isLogIn) {
        try {
            const auth1 = getAuth();
            const { user } = await createUserWithEmailAndPassword(auth1, email, password);

            console.log(user)

            const expirationDate = new Date(Date.now() + user.stsTokenManager.expirationTime * 1000);
            localStorage.setItem("token", user.stsTokenManager.accessToken);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("displayName", `${name} ${lastName}`);

            await updateProfile(auth1.currentUser, { displayName: `${name} ${lastName}` });

            const db = getDatabase();
            await set(ref(db, `users/${user.uid}`), {
                name,
                lastName,
                email,
                password,
                bio,
                formation,
                admin,
                account,
            });

            autoLogout(user.stsTokenManager.expirationTime);
            autoLogin();
        } catch (error) {
            createError(error.message || error);
        }
    }

    function autoLogin() {
        const token = localStorage.getItem("token");
        const displayName = localStorage.getItem("displayName");
        const expiration = new Date().getTime() + localStorage.getItem("expirationDate") * 1000;

        if (!token || new Date(expiration) <= new Date()) {
            logout();
        } else {
            authSucceed(token);
            autoLogout((expiration - new Date().getTime()) / 1000);
            updateName(displayName);
        }
    }

    function autoLogout(timeInSeconds) {
        setTimeout(() => {
            logout();
            window.location.replace('/');
            createError("The current session expired");
        }, timeInSeconds * 1000);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationDate");
        localStorage.removeItem("displayName");

        setauthToken(null);
        deleteName();
    }

    return (
        <AuthContext.Provider value={{
            authToken,
            name,
            accountsallowed,
            auth,
            autoLogin,
            signup,
            logout,

        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};


