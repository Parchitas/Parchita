import React, { useState, useEffect } from "react"
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/credenciales"
import { useNavigate } from "react-router-dom"
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Grid, Button, CircularProgress } from '@mui/material'
import { Col } from "react-bootstrap";

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
    console.log(tipoHab)
    const { nombre, camas, capacidad, comodidades, precioNoche, reservaciones } = tipoHab

    const handleClick = () => {
        console.log("Reservando...")
        console.log(id)
        navigate("../reservar", {
            state: {
                tipoHabitacion: { ...tipoHab, id: id, nombreHotel: nombreHotel }
            }
        })
    }

    return (<div>
        {loading ? <CircularProgress /> :
            <><br /><Col sm>

                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {nombre}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" align="left">
                                <p>{camas}</p>
                                <p>Capacidad: {capacidad} personas</p>
                                <p>Comodidades: {comodidades.join(", ")}</p>
                                <p>Precio total por noche: ${precioNoche}</p>
                            </Typography>
                            <button onClick={handleClick}>Reservar</button>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Col></>}
    </div>);
}

//Codigo de Michelle (respaldo)
/*<li style={{ margin: "20px" }}>
                    <h3><strong>{nombre}</strong></h3>
                    <h3>$ {precioNoche}</h3>
                    <h3>{camas}</h3>
                    <h3>Capacidad: {capacidad}</h3>
                    <h3>Comodidades: {comodidades.join(", ")}</h3>
                    <button onClick={handleClick}>Reservar</button>
                </li>} */

export default TipoHabitacion;