import React from "react"
import { useParams, useLocation } from "react-router-dom";
import Hotel from "../Hotel/Hotel"
import { Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";

function CiudadDetalles() {
    const { ciudadID } = useParams();
    const location = useLocation()
    const { ciudad } = location.state
    console.log(ciudad.props.ciudad)
    const { id, nombre, descripcion, ambiente, ranking, lugaresInteres, imagenes, hoteles } = ciudad.props.ciudad
    return (<><br /><div style={{ display: 'block', paddingInline: '15px', }}>
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
        component="img"
        height="250"
                image={imagenes[0]}
        alt={nombre}
            />
            <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {nombre}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="right">
          {descripcion}
                </Typography><br />
                <Typography variant="caption" color="text.secondary">
          Ambiente: {ambiente} <br />
          Ranking: {ranking} <br />
          Lugares Importantes: {lugaresInteres.join(", ")}
                </Typography><br />
        
        <div>
            {imagenes.map(imagen => <img src={imagen} width="300px"></img>)}
        </div></CardContent></Card>

        <div>
            <h2>Hoteles</h2>
            <ul>

                {hoteles.map((hotel) => <Hotel key={hotel.id} hotel={hotel} />
                )}
            </ul>
        </div>
    </div></>);
}

export default CiudadDetalles;