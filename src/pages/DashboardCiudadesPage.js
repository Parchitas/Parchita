import React from "react";
import '../css/dashboardCiudades.css'
import { queryCiudades, deleteCiudad, createCiudad } from "../services/ciudades"
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { CircularProgress } from "@material-ui/core"


function DashboardCiudadesPage() {

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



    const handleDelete = (ciudadId) => {
        swal({
            title: "¿Estás seguro?",
            text: "Una vez eliminado, no se podrá recuperar los datos almacenados",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Se eliminó con exito.", {
                        icon: "success",

                    }

                    );
                    setLoading(true)
                    deleteCiudad(ciudadId).then(() => {
                        setCiudades(ciudades.filter(ciudad => ciudadId != ciudad.id))
                        setLoading(false)
                    })
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
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
        <CircularProgress/>
    )

    return (
        <>
            <div className="imagenFondo">
                <div className="cont">
                    <div className="contenedor">
                        <table className="tabla">
                            <tr className="head">

                                <th >Ciudad</th>

                                <th>Accion</th>



                            </tr>
                            {loading ? <CircularProgress/> : null}
                            {ciudades.map(({ id, nombre }) => (

                                <>
                                    <tr border>
                                        <td className="Nombre">
                                            {nombre}
                                        </td>
                                        <td>
                                            <div className="botonesContainer">
                                                <button className='button' onClick={() => navigate(`/dashboardCiudades/${id}`)}> Editar </button>
                                                <button className='buttonE' onClick={(() => { handleDelete(id) })}> Eliminar </button>
                                            </div>
                                        </td>
                                    </tr>

                                </>
                            ))}
                        </table>

                        <div>

                            
                            <form onSubmit={handleSubmit}>

                                <button className='button' onClick={() => navigate(`/dashboardCiudades/create`)}>Agregar ciudad</button>
                            </form>
                            <br />
                            
                            <button className='button' onClick={() => navigate(`/dashboard`)}>Volver al dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default DashboardCiudadesPage;

