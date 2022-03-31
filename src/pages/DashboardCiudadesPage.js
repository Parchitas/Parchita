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
        <div className="imagenFondo">
            <div className="cont">
                <div className="contenedor">
                    <table className="tabla">
                        <tr className="head">

                            <th >Nombre</th>

                            <th>Accion</th>

        

                        </tr>
                        {loading ? <div>cargando</div> : null}
                        {ciudades.map(({id,nombre})=>(

                            <>
                                <tr border>
                                    <td className="Nombre">
                                        {nombre}
                                    </td>
                                    <td>
                                        <div className="botonesContainer">
                                            <button className='button' onClick={() => navigate(`/dashboardCiudades/${id}`)}> Editar </button>
                                            <button className='buttonE' onClick={(() => {handleDelete(id)})}> Eliminar </button>
                                        </div>
                                    </td>
                                </tr>
                            
                            </>
                        ))}
                    </table>

                <div>
                    
                    <div className="title">Agregar una nueva ciudad </div>
                    <form onSubmit={handleSubmit}>
                        
                        <button className='button'onClick = {() => navigate(`/dashboardCiudades/create`)}>Submit</button>
                    </form> 
                    <br/>
                    <div>Volver al Dashboard</div>
                    <button className='button' onClick={() => navigate(`/dashboard`)}>Click!!!</button>
                    </div>
                </div>
            </div>    
        </div>
    </>
    );

}

export default DashboardCiudadesPage;

