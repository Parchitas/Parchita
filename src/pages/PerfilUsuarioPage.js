import React from "react";
import { sessionContext } from "../context/SessionContext";

function PerfilUsuarioPage(){

    const {session} = React.useContext(sessionContext)

    return(
        <div>Nombre: {session.name}, Correo: {session.email}</div>
    )
}

export default PerfilUsuarioPage;