import React from 'react'
import { makeStyles, Typography, Button, Card, CardContent, Grid, Box } from "@material-ui/core"
import { Stack } from '@mui/material'
import background_image from "../../imagenes/Banner.jpg"
import { Link } from "react-router-dom"
import { useState, useContext } from 'react'
import { sessionContext } from "../../context/SessionContext"



const Banner = () => {
  const {isAdmin} = useContext(sessionContext)
  const classes=useStyle()
  return (
    <div className={classes.root}>
      {/*<div className={classes.info }>
        <Typography variant="h2"> Have Fun</Typography>
        <Button variant="contained">Check our Rooms</Button>
      </div>
      */}
      <br />
      <br />
      <br />
      <div>
        <Grid container justifyContent="center" alignItems="center" spacing={5}>
          <br />

          <Grid item sx>
            <Button
              component={Link}
              to="/ciudades"
              size="large"
              variant="contained"
              color="error"
            >
              Explora tus ciudades
            </Button>
            <br />
            <br />
            {isAdmin ? (
              <Button
                component={Link}
                to="/dashboard"
                size="large"
                variant="contained"
                color="error"
              >
                Editar Base de Datos
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </div>
    </div>
  );
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