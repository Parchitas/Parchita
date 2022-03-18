import { Link } from "react-router-dom"
import React from "react";

const NotFound = () => {
    return (
        <div>
            <h1>404</h1>
            <Link to="/" className="btn btn-outline-dark">
                Inicio
            </Link>
        </div>
    );
};

export default NotFound;