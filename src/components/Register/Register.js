import { Card, CardContent, TextField, CardActions, Button } from "@material-ui/core";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { sessionContext } from '../../context/SessionContext';

function Register(){
    
    const navigate = useNavigate();
    const {register,session, isLoading} = React.useContext(sessionContext)

    const submitHandler = (e) => {
        e.preventDefault()
        const [name, email, password] = e.target
        register(name.value, email.value, password.value, "usuario").then(() => {
            navigate("/")
          })
    }

    
    return(

        <>
            {isLoading ? <h1>Cargando...</h1> : null}
            <br/><div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card><CardContent>                
                    <form onSubmit={submitHandler}>
                        <div>
        <TextField htmlFor="name" id="name" type="name" label="Nombre" variant="standard" /><br/>             
        <TextField htmlFor="email" id="email" type="email" label="Correo Electronico" variant="standard" /><br/>               
        <TextField htmlFor="password" id="password" label="Contraseña" type="password" autoComplete="current-password" variant="standard" />
                            </div>
        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit" >Registrar</Button>
                            </CardActions>

                    </form>
                    </CardContent></Card>
        </div></>
    )
}

export default Register;