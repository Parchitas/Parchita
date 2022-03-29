// No estoy seguro de esta Pagina porque quizas podamos poner los dashboards 
// en las mismas paginas de hotel y ciudades
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
        createCiudad(e.target[0].value, e.target[1].value)
    }
    if (loading) return (
        <h3>Cargando</h3>
    )
    return (
        <>
        <div className="container">
            <table className="default">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Accion</th>
                    </tr>

                </thead>
                <tbody>
                    {loading ? <div>cargando</div> : null}
                     
                            {ciudades.map(({id,nombre}) =>(

                                <>
                                <tr>
                                    <td>
                                    {nombre}
                                    </td>
                                    <td>
                                        <button onClick={() => navigate(`/dashboardCiudades/${id}`)}> Editar </button>
                                        <button onClick={(() => {handleDelete(id)})}> Eliminar </button>
                                    </td>
                                </tr>
                                </>


                            ) )}
                    
                
                </tbody>
            </table>
            <div className="title">Agrega una nueva Ciudad SUUU</div>
            <form onSubmit={handleSubmit}>
            <label >
                Nombre: 
                <input type="text" id='nombre' name ="nombre"/>
            </label>
            <label >
                Descripcion: 
                <input type="text" id='text' name="descripcion"/>
            </label> 
            <button>Submit</button>
        </form> 
        </div>
    </>
    );

}

export default DashboardCiudadesPage;

