import React from 'react';
import { Link } from "react-router-dom"
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core'

function Ciudad(props) {

    const { id, nombre, ambiente, ranking, imagenes } = props.ciudad;
    //const nombreUrl = nombre.toLowerCase().replace(" ","-")
    return (

        <><br /><Link to={"/ciudades/" + id} state={{ ciudad: { props } }}>
            <Card sx={{ maxWidth: 20 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        image={imagenes[0]}
                        alt={nombre} />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {nombre}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" align="right">
                            <p>Ambiente: {ambiente}</p>
                            <p>Ranking: {ranking}</p>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card></Link></>
  
    )

}

export default Ciudad;