import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {queryHotel, updateHoteles} from "../services/hoteles"

function DashboardEditHotelPage (){
   
    const navigate = useNavigate()
    const { hotelID } = useParams();
    const [hotel, setHotel] = React.useState()
    const [loading, setLoading] = React.useState(true)
    
    React.useEffect(() => {

        setLoading(true)
        queryHotel(hotelID).then((response) => {
            setHotel(response)
            setLoading(false)
        })

    }, [])

    function onChange(e) {
        const formName = e.target.name;
        const formValue = e.target.value;

        setHotel(prevHotel => ({ ...prevHotel, [formName]: formValue }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        updateHoteles(hotel,hotelID).then(() => {
            navigate("/dashboardHoteles");
        }).catch(e => console.error({ error: e, msg: "ta malardo" }));
    }
    
    if (loading) return (
        <div> cargando </div>
    )

    return(
        <form onSubmit={handleSubmit}>
            <label >
                Nombre: 
                <input type="text" id="nombre" name ="nombre" value= {hotel.nombre ?? ""} onChange={onChange} />
            </label>
            <label >
                Ranking: 
                <input type="text" id='text' name="ranking" value= {hotel.ranking ?? ""} onChange={onChange} />
            </label> 
            <button>Submit</button>
        </form> 
    )
}

export default DashboardEditHotelPage; 