import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { queryCiudad, updateCiudad } from "../services/ciudades"

function DashboardEditCiudadPage (){
    const navigate = useNavigate()
    const { ciudadID } = useParams();
    const [ciudad, setCiudad] = React.useState()
    const [loading, setLoading] = React.useState(true)
    
    React.useEffect(() => {

        setLoading(true)
        queryCiudad(ciudadID).then((response) => {
            setCiudad(response)
            setLoading(false)
        })

    }, [])

    function onChange(e) {
        const formName = e.target.name;
        const formValue = e.target.value;

        setCiudad(prevCiudad => ({ ...prevCiudad, [formName]: formValue }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        updateCiudad(ciudad,ciudadID).then(() => {
            navigate("/dashboardCiudades");
        }).catch(e => console.error({ error: e, msg: "ta malardo" }));
    }

    if (loading) return (
        <div> cargando </div>
    )

    return(
        <form onSubmit={handleSubmit}>
            <label >
                Nombre: 
                <input type="text" id='nombre' name ="nombre" value= {ciudad.nombre ?? ""} onChange={onChange} />
            </label>
            <label >
                Descripcion: 
                <input type="text" id='text' name="descripcion" value= {ciudad.descripcion ?? ""} onChange={onChange} />
            </label>
            <button>Submit</button>
        </form> 
    )
}

export default DashboardEditCiudadPage; 