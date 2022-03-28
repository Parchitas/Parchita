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
        </div>
    );
}

export default DashboardHotelesPage;