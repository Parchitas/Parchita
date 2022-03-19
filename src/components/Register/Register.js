import React from "react";
import { useNavigate } from 'react-router-dom';
import { sessionContext } from '../../context/SessionContext';

function Register(){
    
    const navigate = useNavigate();
    const {register,session} = React.useContext(sessionContext)

    const submitHandler = (e) => {
        e.preventDefault()
        const [name, email, password] = e.target
        register(name.value, email.value, password.value, "usuario")
        navigate("/");
    }

    
    return(
        
        <form onSubmit={submitHandler}>

        <label htmlFor="name">
            Name: 
            <input type="name" id='name'/>
        </label>

        <label htmlFor="email">
            Correo Electronico: 
            <input type="email" id='email'/>
        </label>

        <label htmlFor="password">
            Contraseña: 
            <input type="password" id='password'/>
        </label>

        <input type="submit" value={"Registrar"}/>

        </form>

    )
}

export default Register;