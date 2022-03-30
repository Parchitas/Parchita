import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/credenciales"
import TipoHabitacion from "../TipoHabitacion/TipoHabitacion";
import { Card, CardActions, CardContent, CardMedia, Typography, Grid, CircularProgress } from "@material-ui/core";
import { Rating } from "@mui/material";

function HotelDetalles() {
    const { ciudadID, hotelID } = useParams()

    const [hotel, setHotel] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHotel = async () => {

        const snap = await getDoc(doc(db, 'hoteles', hotelID))

        setHotel(snap.data())
        setLoading(false)
    }

    useEffect(() => {
        fetchHotel();
    }, []);
    
    const { nombre, ranking, instalaciones, imagen, tipoHabitaciones } = hotel
    return (
        <div>
            {loading ? <CircularProgress/> :
                
                <><div style={{ display: 'block', paddingInline: '100px', }}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            className="d-block w-50 mx-auto"
                            image={imagen}
                            alt={nombre} />
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="div">
                                {nombre}
                                <Rating name="Ranking" defaultValue={`${ranking}`} precision={0.5} size="small" readOnly />
                            </Typography>
                            <Typography variant="h6" color="text.secondary">

                                <p>Instalaciones: {instalaciones.join(", ")}</p>
                            </Typography>
                        </CardContent>
                    </Card><br />
                    <h2>Habitaciones disponibles</h2></div><div style={{ display: 'flexbox'}}>

                        <Grid container justifyContent="center" spacing={1}>
                            {tipoHabitaciones.map(tipo => <TipoHabitacion key={tipo.id} tipo={{ ...tipo, nombreHotel: nombre }} />)}
                        </Grid>
                    </div></>                   
                }

        </div>);
}

export default HotelDetalles;