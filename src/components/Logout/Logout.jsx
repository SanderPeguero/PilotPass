import React, {Component, useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import {Route, Navigate} from "react-router-dom";
// import {logout} from "../../store/actions/authActions";
import { logout } from "../../redux/user/authFunctions";

const Logout = () => {
    
    const dispatch = useDispatch(); 

    useEffect(() => {
        
        dispatch(logout())

    });

    return(

        <Navigate to='/' replace />

    )

}

export default Logout