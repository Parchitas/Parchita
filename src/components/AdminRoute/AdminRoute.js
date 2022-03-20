import React from "react";
import React, { useContext } from "react";
import {sessionContext} from "../../context/SessionContext"
import { Navigate, useLocation } from "react-router-dom";

export default function AdminRoute({children}){

    const {isAdmin} = useContext(sessionContext);
    const location = useLocation();
    if (!isAdmin) {
        console.log(location)
        return <Navigate to="/login?fromPrivateRoute=true" state={{ from: location }} replace/>
    }

    return children

}  