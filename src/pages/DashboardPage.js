//Pantalla para elegir a que dashboard el admin quiere ir si al de hoteHoteles de Hoteles
import React from "react";
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Button, Card, CardContent, Box } from "@material-ui/core";


function DashboardPage() {

    const navigate = useNavigate()

    return (
        <>
            <br />
            <div>
                <Grid container justifyContent="center">
                    <Box sx={{
                        width: 300,
                        height: 200,
                    }}>
                        <Card>
                            <CardContent>
                                <Typography ariant="h5" align="center">Selecciona el dashboard al cual acceder </Typography><br />
                                <Grid container justifyContent="center" spacing={5}>
                                    <Grid item><Button size="big" variant="contained" onClick={() => navigate("/dashboardCiudades")}>Ciudades</Button></Grid>
                                    <Grid item><Button size="big" variant="contained" onClick={() => navigate("/dashboardHoteles")}>Hoteles</Button></Grid>
                                </Grid>
                            </CardContent></Card></Box>
                </Grid>
            </div>
        </>
    );

}

export default DashboardPage;