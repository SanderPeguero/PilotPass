//dependencies
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

//contexts
import { useAuth } from "../contexts/AuthContext";

const Logout = () => {

    const { logout } = useAuth()

    useEffect(() => {
        logout()
    });

    return (
        <Navigate to='/' replace />
    )
}

export default Logout