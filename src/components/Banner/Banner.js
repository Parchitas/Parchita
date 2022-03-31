import React from 'react'
import { makeStyles, Typography, Button, Card, CardContent, Grid, Box} from "@material-ui/core"
import background_image from "../../imagenes/Banner.jpg"
import { Link } from "react-router-dom"
import { useState, useContext } from 'react'
import { sessionContext } from "../../context/SessionContext"



const Banner = () => {
  const {isAdmin} = useContext(sessionContext)
  const classes=useStyle()
  return (
    
    <div className={classes.root }>
      {/*<div className={classes.info }>
        <Typography variant="h2"> Have Fun</Typography>
        <Button variant="contained">Check our Rooms</Button>
      </div>
      */}<br/>
      <div>
        <Grid container justifyContent="center" alignItems="center" spacing={1}><br />
          <Grid item><Box
                    sx={{
                        width: 400,
                        height: 300,
                    }}
                ><Card>
          <CardContent>
            <Typography variant="h5" align="center">¿Que es Parchita?</Typography><br />
      <Typography variant="body1" align="justify">Sabemos que cuando visitas un hotel puedes llevarte una experiencia tanto ácida como dulce ¡¡¡COMO LA PARCHITA!!!. Por eso mismo ponemos a su disposición una plataforma donde podrás obtener información útil de las ciudades listadas, así como sitios de interés y te ofrecemos también la posibilidad de reservar una habitación en uno de los grandes hoteles con los que poseemos contacto, para que disfrutes de ese viaje que tanto desean.</Typography>
        </CardContent>
            </Card></Box></Grid>
        <Grid item sx>    
                    <Button component={Link} to="/ciudades" size="large" variant='contained' color='error' >Explora tus ciudades</Button><br/><br/>
          {isAdmin ?
          
                    <Button component={Link} to="/dashboard" size="large" variant='contained' color='error' >Editar Base de Datos</Button>
          : null}</Grid></Grid>
        </div>
    </div>
  )
}


const useStyle=makeStyles((theme)=>({
    root: {
      height: "80vh", 
      position: "relative",      
      backgroundImage: `url(${background_image})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
    info: {
      backgroundColor: "#000",
      color: "#fff",
      width: "700px",
      padding: theme.spacing(2),
  
      "& h2":{
        marginBottom: theme.spacing(4),
      },
      "& button":{
        backgroundColor: "rgba(255,103,31)",
        color: "#fff",
        textTransform:"inherit",
        fontSize: "1,2rem",
        fontWeight: "bold",
        

      },
      "& button:hover":{
        backgroundColor: "#fff",
        color: "rgba(255,103,31)",
        

      }
    }
    
  
  
}))

export default Banner