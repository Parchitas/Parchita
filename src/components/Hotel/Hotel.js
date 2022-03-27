import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import {Card, CardMedia,CardActionArea,CardContent,Typography} from "@material-ui/core";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/credenciales"
import "../../css/CiudadDetalles.css"

function Hotel(props) {
    const { ciudadID } = useParams()
    const {id, nombre} = props.hotel
    const [hotel, setHotel] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHotel = async () => {

        const snap = await getDoc(doc(db, 'hoteles', id))

        setHotel(snap.data())
        setLoading(false)
    }

    useEffect(() => {
        fetchHotel();
    }, []);
    console.log("Pueba")

    return ( 
    
      
                <Link className="linkCard" to={"/ciudades/" + ciudadID + "/hoteles/" + id}>
                    <Card className="card">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={hotel.imagen}
                                alt={hotel.nombre} />
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div">
                                    {hotel.nombre}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" align="right">
                                    <p>Ranking: {hotel.ranking}</p>
                                 
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
        
    );
}

export default Hotel;