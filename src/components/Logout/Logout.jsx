import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
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