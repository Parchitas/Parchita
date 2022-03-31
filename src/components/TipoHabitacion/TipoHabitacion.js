import React, { useState, useEffect } from "react"
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/credenciales"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, Typography, Grid, Button, CircularProgress } from '@mui/material'

function TipoHabitacion(props) {

    const { tipo } = props
    const { id, nombreHotel } = tipo
    const navigate = useNavigate()

    const [tipoHab, setTipoHab] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTipoHab = async () => {

        const snap = await getDoc(doc(db, 'tipohabitaciones', id))

        setTipoHab(snap.data())
        setLoading(false)
    }

    useEffect(() => {
        fetchTipoHab();
    }, []);

    const { nombre, camas, capacidad, comodidades, precioNoche, reservaciones } = tipoHab

    const handleClick = () => {
        navigate("../reservar", {
            state: {
                tipoHabitacion: { ...tipoHab, id: id, nombreHotel: nombreHotel }
            }
        })
    }

    return (<div>
        {loading ? <CircularProgress /> :
            
                <Grid item sx><br />
                <div style={{ display: 'block', paddingInline: '30px', }}>
                <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {nombre}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" align="center">
                                <p>{camas}</p>
                                <p>Capacidad: {capacidad} personas</p>
                                    <p>Comodidades: {comodidades.join(", ")}</p>
                                    <p>Precio total por noche: ${precioNoche}</p>    
                                </Typography><Typography align="right">
                                                       
                                <Button variant="contained" onClick={handleClick}>Reservar</Button></Typography>
                        </CardContent>
                </Card>
            </div></Grid>}
    </div>);
}

export default TipoHabitacion;