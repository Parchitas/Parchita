import React from 'react'
import {CssBaseline, makeStyles, Button, Typography} from '@material-ui/core'
import Banner from '../components/Banner/Banner'
import DatePicker from '../components/General/DatePicker'
import {useState, useContext} from 'react'
import { Link } from "react-router-dom"
import { sessionContext } from "../context/SessionContext"


const HomePage = () => {

  const {isAdmin} = useContext(sessionContext)
  const classes=useStyle()

  return (
    <>
    <CssBaseline>
    {isAdmin ? <Link to="/dashboard" >Ver Dashboards AQUI</Link> : null}
      <div className={classes.root}>
          <Banner/>         
      </div>
      </CssBaseline>
      <Typography></Typography>
      <Link to="/ciudades">
        <Button size="large" variant='contained' color='error'>Explora tus ciudades</Button>
      </Link>

    </>
  )
}


const useStyle=makeStyles((theme)=>({
  root:{
    display: "flex",
    flexDirection: "column",
    
  },
  dates:{
    display: "flex",
    flexDirection: "column",

  },

 

}))

export default HomePage
