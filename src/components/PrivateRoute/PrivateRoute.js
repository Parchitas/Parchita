import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({children,isAllowed}){

    const location = useLocation();

    if (!isAllowed) {
        console.log(location)
        return <Navigate to="/login?fromPrivateRoute=true" state={{ from: location }} replace/>
    }

    return children

}  