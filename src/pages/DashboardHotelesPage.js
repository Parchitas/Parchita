import React from "react";
import { map } from "@firebase/util";
import '../css/dashboardHoteles.css'
import {queryHoteles, deleteHotel} from "../services/hoteles"
import { useNavigate } from 'react-router-dom';


function DashboardHotelesPage(){

    const [hoteles, setHoteles] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    React.useEffect(() => {

        setLoading(true)
        queryHoteles().then((response) => {
            setHoteles(response)
            setLoading(false)
        })

    }, [])

    const handleDelete = (hotelId) =>{
        setLoading(true)
        deleteHotel(hotelId).then(() => {
            setHoteles(hoteles.filter( hotel => hotelId != hotel.id))
            setLoading(false)
        })
    }

    return (
        <div className="container">
            {loading ? <div>cargando</div> : null}
            {hoteles.map(({ id, nombre }) => (
                <>
                    <div className="data">
                        <div className="hoteles">{nombre}</div>
                        <div className="botonesContainer">
                            <button onClick={() => navigate(`/dashboardHoteles/${id}`)}> Editar </button>
                            <button onClick={(() => {handleDelete(id)})}> Eliminar </button>
                        </div>
                    </div>
                </>
            ))}
        <div>Aqui para agregar Nuevo Hotel</div>
        <button onClick={() => navigate(`/dashboardHoteles/create`)}>Click!!!</button>
        
        <div>Aqui para Devolverse al Dashboard</div>
        <button className="BotonesNormales" onClick={() => navigate(`/dashboard`)}>Click!!!</button>
        <div>Aqui para Modificar las habitaciones de tus Hoteles</div>
        <button className="BotonesNormales" onClick={() => navigate(`/dashboardHabitaciones`)}>Habitaciones</button>
        </div>
    );
}

export default DashboardHotelesPage;