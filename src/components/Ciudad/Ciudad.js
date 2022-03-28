import React from 'react';
import { Link } from "react-router-dom"
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Grid } from '@mui/material'
import Rating from '@mui/material/Rating';

function Ciudad(props) {

    const { id, nombre, ambiente, ranking, imagenes } = props.ciudad;
    //const nombreUrl = nombre.toLowerCase().replace(" ","-")

    return (
        <Grid item><br />
            <Link to={"/ciudades/" + id} state={{ ciudad: { props } }}>
                <Box
                    sx={{
                        width: 300,
                        height: 400,
                    }}
                >
                    <Card>
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
                                    <Rating name="Ranking" defaultValue={`${ranking}`} precision={0.5} size="big" readOnly />
                                    <p>{ambiente}</p>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            </Link></Grid>
            
    )

}

export default Ciudad;