import React from "react"
import { useParams, useLocation } from "react-router-dom";
import Hotel from "../Hotel/Hotel"
import info from "../CiudadesLista/CiudadesLista.json"
import { Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";
import '../../css/CiudadDetalles.css'

function CiudadDetalles() {
    const { ciudadID } = useParams();
    const location = useLocation()
    const { ciudad } = location.state
    console.log("Location : ",location.state)
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
        
        <div className="seccionImagenes">
            {imagenes.map(imagen =><div className="imagen"><img src={imagen} height ="300px" width="300px"></img></div> )}
        </div></CardContent></Card>

        <div>
            <div className="tituloHoteles">
                <h1>Hoteles</h1>
            </div>
            <div className="listaHoteles">
                {hoteles ?
                    

                        hoteles.map((hotel) =>
                            <Hotel key={hotel.id} hotel={hotel}  />
                        )
                       
                        
                     : <div>No se encuentran hoteles disponibles actualmente en esta ciudad</div>}
            </div>
        </div>
    </div></>);
}

export default CiudadDetalles;