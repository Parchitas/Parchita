import React from "react";
import { sessionContext } from "../context/SessionContext";
import { Card, CardMedia, CardContent, Typography, Avatar, Button, Grid } from "@mui/material";
import { amber} from "@mui/material/colors"



function PerfilUsuarioPage() {

    const { session } = React.useContext(sessionContext);
    console.log(session);

    function logout() {
        localStorage.clear();
        window.location.href = '/';
    };
    

    return (
        <><br /><div style={{ display: 'block', paddingInline: '100px', }}>
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
                </CardContent><div style={{ display: 'flexbox', justifyContent: 'center' }}>
                <Grid container justifyContent="center" spacing={1}>
                <Grid item><Button onClick={logout} variant="outlined" color="error" size="large">Cerrar Sesion</Button></Grid>
                <Grid item><Button variant="contained" color="success" size="large">Modificar perfil</Button></Grid>
                </ Grid ></div><br />
            </Card></div></>
    )
}

export default PerfilUsuarioPage;