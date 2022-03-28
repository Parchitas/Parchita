import React from "react";
import { useParams } from "react-router-dom";
import {queryCiudad} from "../services/ciudades"

function DashboardEditCiudadPage (){
    
    const { ciudadID } = useParams();
    const [ciudad, setCiudad] = React.useState()
    const [loading, setLoading] = React.useState(false)
    
    React.useEffect(() => {

        setLoading(true)
        queryCiudad(ciudadID).then((response) => {
            setCiudad(response)
            setLoading(false)
        })

    }, [])
    
    
    return(
        <div>{ciudad.nombre}</div>
    )
}

export default DashboardEditCiudadPage; 