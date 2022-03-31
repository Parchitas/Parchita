import { map } from "@firebase/util";
import React from "react";
import CiudadesLista from "../components/CiudadesLista/CiudadesLista";
import '../css/dashboardCiudades.css'
import {queryCiudades, deleteCiudad, createCiudad} from "../services/ciudades"
import { useNavigate } from 'react-router-dom';


function DashboardCiudadesPage(){

    const [ciudades, setCiudades] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    React.useEffect(() => {

        setLoading(true)
        queryCiudades().then((response) => {
            setCiudades(response)
            setLoading(false)
        })

    }, [])

    

    const handleDelete = (ciudadId) =>{
        setLoading(true)
        deleteCiudad(ciudadId).then(() => {
            setCiudades(ciudades.filter( ciudad => ciudadId != ciudad.id))
            setLoading(false)
        })
    }


    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        createCiudad(e.target[0].value, e.target[1].value).then(() => {
            queryCiudades().then((response) => {
                setCiudades(response)
                setLoading(false)
            })
        })
    }

    if (loading) return (
        <h3>Cargando</h3>
    )

    return (
        <>
        <div className="container">

            {loading ? <div>cargando</div> : null}
            {ciudades.map(({ id, nombre }) => (
                <>
                    <div className="data">
                        <div className="ciudades">{nombre}</div>
                        <div className="botonesContainer">
                            <button onClick={() => navigate(`/dashboardCiudades/${id}`)}> Editar </button>
                            <button onClick={(() => {handleDelete(id)})}> Eliminar </button>
                        </div>
                    </div>
                </>
            ))}
            <div className="title">Agregar una nueva Ciudad AQUI</div>
            <form onSubmit={handleSubmit}>
            
            <button onClick = {() => navigate(`/dashboardCiudades/create`)}>Submit</button>
        </form> 
        <div>Aqui para Devolverse al Dashboard</div>
        <button onClick={() => navigate(`/dashboard`)}>Click!!!</button>
        </div>
    </>
    );

}

export default DashboardCiudadesPage;

