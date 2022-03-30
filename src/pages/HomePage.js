import React from 'react'
import {CssBaseline, makeStyles, Button, Typography, Grid} from '@material-ui/core'
import Banner from '../components/Banner/Banner'
import DatePicker from '../components/General/DatePicker'
import {useState, useContext} from 'react'
import { Link } from "react-router-dom"
import { sessionContext } from "../context/SessionContext"



const HomePage = () => {

  const {isAdmin} = useContext(sessionContext)


  return (
    <>
      <div >
          <Banner/>         
      </div>
      
      <Typography></Typography>
      <br/><div>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item sx>    
                    <Button component={Link} to="/ciudades" size="large" variant='contained' color='error' >Explora tus ciudades</Button>
          </Grid>{isAdmin ?
          <Grid item sx>
                    <Button component={Link} to="/dashboard" size="large" variant='contained' color='error' >Ver Dashboards AQUI</Button>
          </Grid>: null}
        </Grid>
      </div>
    </>
  )
}

export default HomePage
