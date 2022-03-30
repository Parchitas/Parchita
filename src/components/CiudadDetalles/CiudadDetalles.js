import React from "react"
import { useParams, useLocation } from "react-router-dom";
import Hotel from "../Hotel/Hotel"
import { Card, CardActions, CardContent, CardMedia, Typography, Grid } from "@material-ui/core";
import '../../css/CiudadDetalles.css'
import { Rating } from "@mui/material";
import { Carousel } from "react-bootstrap";

function CiudadDetalles() {
    const { ciudadID } = useParams();
    const location = useLocation()
    const { ciudad } = location.state
    console.log("Location : ", location.state)
    const { id, nombre, descripcion, ambiente, ranking, lugaresInteres, imagenes, hoteles } = ciudad.props.ciudad
    return (
        <>
            <br />
            <div style={{ display: 'block', paddingInline: '100px', }/*paddingInline: '15px'*/}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia>
                        <Carousel variant="dark">
                            {imagenes.map(imagen => <Carousel.Item><img src={imagen} className="d-block w-80 mx-auto" alt='Fotos mostrando la ciudad'></img></Carousel.Item>)}
                        </Carousel>
                    </ CardMedia >
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {nombre} <Rating name="Ranking" defaultValue={`${ranking}`} precision={0.5} size="large" readOnly />
                        </Typography>
                        <Typography variant="body1" color="text.secondary" align="right">
                            {descripcion}
                        </Typography><br />
                        <Typography variant="caption" color="text.secondary">

                            Ambiente: {ambiente} <br />
                            Lugares Importantes: {lugaresInteres.join(", ")}
                        </Typography><br />

                    </CardContent>
                </Card>

                <div>
                    <div className="tituloHoteles">
                        <h1>Hoteles</h1>
                    </div>
                    <div className="listaHoteles">
                        
                        {hoteles ?


                            hoteles.map((hotel) =>
                                <Grid container justifyContent="center" spacing={1}><Hotel key={hotel.id} hotel={hotel} /></Grid>
                            )

                            
                            : <div>No se encuentran hoteles disponibles actualmente en esta ciudad</div>}
                    </div>
                </div>
            </div>
        </>);
}

export default CiudadDetalles;