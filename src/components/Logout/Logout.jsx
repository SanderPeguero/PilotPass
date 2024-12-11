import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useContextPilotPass } from "../../Context";

const Logout = () => {

    const { logout } = useContextPilotPass()

    useEffect(() => {
        logout()
    });

    return (
        <Navigate to='/' replace />
    )
}

export default Logout