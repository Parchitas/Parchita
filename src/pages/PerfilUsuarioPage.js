import React from "react";
import { sessionContext } from "../context/SessionContext";
import { Card, CardMedia, CardContent, Typography, Avatar, Button, Grid } from "@mui/material";
import { amber} from "@mui/material/colors"
import {Modal} from "react-bootstrap"
import { useState } from "react";
import {db} from '../firebase/credenciales';
import { doc, updateDoc } from "firebase/firestore";
import { RotateLeft } from "@material-ui/icons";

const collectionDatos = "usuarios"


function PerfilUsuarioPage() {

    const { session } = React.useContext(sessionContext);
    console.log(session);

    function logout() {
        localStorage.clear();
        window.location.href = '/';
    };
    
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   
   

   function datosM(nom,telef,email){
       return {
           nombre:nom,
           telefono:telef,
           correo:email,
           rol:session.rol
       }
    
   }
   const[usuario,setUsuario]=useState({...session})
   
   const submitHandler = (e) => {

        e.preventDefault()
        updateUsuario(
            datosM(
                document.getElementById("name").value,
                document.getElementById("number").value,
                document.getElementById("email").value,
                )
        )
            
        handleClose()
        
  
  
    }
  
   
   
    const updateUsuario = async (datosM) => {
    
        const usuarioRef = doc(db, collectionDatos, session.id)
        await updateDoc(usuarioRef, {
            name: datosM.nombre,
            telefono: datosM.telefono
    })}

    return (
        <>
            <br />
                <div style={{ display: 'block', paddingInline: '100px', }}>
                    <Card>
                        <CardMedia>
                                <Avatar src={"session.image"} className="mx-auto" alt={session.name} sx={{ width: 200, height: 200, bgcolor: amber[500] }} />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="div" align="center">
                                {session.name}
                            </Typography>
                            <Typography variant="h5" color="text.secondary" align="center">
                                Correo: {session.correo}<br />
                                Telefono: {session.telefono}<br />
                            </Typography>
                        </CardContent>
                        <div style={{ display: 'flexbox', justifyContent: 'center' }}>
                            <Grid container justifyContent="center" spacing={1}>
                            <Grid item><Button onClick={logout} variant="outlined" color="error" size="large">Cerrar Sesion</Button></Grid>
                            <Grid item><Button onClick={
                                handleShow
                                }
                                variant="contained" color="success" size="large">Modificar perfil</Button></Grid>
                            </ Grid >
                        </div>
                        <br />
                     </Card>
                </div>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                
           
                <Modal.Body>
                    <label >
                        Nombre
                        <input  onChange={(e)=>setUsuario({
                            ...usuario,
                            name:e.target.value,
                        })} 
                        value={usuario.name} type="name" id='name' />
                    </label>
                    <label >
                        correo
                        <input  onChange={(e)=>setUsuario({
                            ...usuario,
                            correo:e.target.value,
                        })} 
                        value={usuario.correo} type="email" id='email' />
                    </label>
                    <label >
                        Telefono
                        <input onChange={(e)=>setUsuario({
                            ...usuario,
                            telefono:e.target.value,
                        })} 
                        value={usuario.telefono} type="number" id='number' />
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit"variant="primary" onClick={submitHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>

            </Modal>
            
            
        </>
    )
}

export default PerfilUsuarioPage;