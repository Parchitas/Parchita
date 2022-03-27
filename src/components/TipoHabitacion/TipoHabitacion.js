import React, { useState, useEffect } from "react"
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebase/credenciales"
import { useNavigate } from "react-router-dom"
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Grid, Button } from '@mui/material'
import Col from "react-bootstrap/esm/Col";

function TipoHabitacion(props) {

    const { tipo } = props
    const { id } = tipo
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
    const { nombre, camas, capacidad, comodidades, precioNoche} = tipoHab

    const handleClick = () => {
        console.log("Reservando...")
        console.log( id)
        navigate("../reservar" )
    }

    return (<div>
        {loading ? <div></div> :
            <><br /><Col sm>

                <Card>
                    <CardActionArea onClick={handleClick}>
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
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Col></>}
    </div>);
}

export default TipoHabitacion;