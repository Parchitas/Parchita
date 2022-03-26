import React from 'react'
import {CssBaseline, makeStyles, Button} from '@material-ui/core'
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
    <div style={{ width : "40%", "background-color": "black"}}>
      <Link to="/ciudades" style={{ color : "white"}}>Ver todas las ciudades</Link>
    </div>
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
    "& button":{
      border: "1px solid #cccccc",
      backgroundColor:"#fff",
      color:"rgba(255,103,31,0.4)",
      textTransform:"inherit",
      fontSize:"1.2rem",
      fontWeight:"bold",

    },
    "& button:hover" :{
      
      backgroundColor:"rgba(255,103,31,0.4)",
      color:"#fff",
   

    }

  },

 

}))

export default HomePage
