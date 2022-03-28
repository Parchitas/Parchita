import React from "react";
import { useParams } from "react-router-dom";
import {queryHotel} from "../services/hoteles"

function DashboardEditHotelPage (){
    
    const { hotelID } = useParams();
    const [hotel, setHotel] = React.useState()
    const [loading, setLoading] = React.useState(false)
    
    React.useEffect(() => {

        setLoading(true)
        queryHotel(hotelID).then((response) => {
            console.log(response)
            setHotel(response)
            setLoading(false)
        })

    }, [])
    
    
    return(
        <div>{hotel.nombre}</div>
    )
}

export default DashboardEditHotelPage; 