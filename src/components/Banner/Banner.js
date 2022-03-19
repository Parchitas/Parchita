import React from 'react'
import { makeStyles, Typography, Button} from "@material-ui/core"
import background_image from "../../imagenes/Banner.jpg"



const Banner = () => {
  const classes=useStyle()
  return (
    
    <div className={classes.root }>
      {/*<div className={classes.info }>
        <Typography variant="h2"> Have Fun</Typography>
        <Button variant="contained">Check our Rooms</Button>
      </div>
      */}
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