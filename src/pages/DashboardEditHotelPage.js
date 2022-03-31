import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { queryHotel, updateHoteles } from "../services/hoteles"
import { queryHabitacion } from "../services/habitaciones";


function DashboardEditHotelPage() {

    const navigate = useNavigate()
    const { hotelID } = useParams();
    const [hotel, setHotel] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const [instalacionesInput, setInstalacionesInput] = React.useState("");
    const [tipoHabitacionesInput, setTipoHabitacionesInput] = React.useState("");

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

    function addTipoHabitaciones() {
        setHotel({ ...hotel, tipoHabitaciones: hotel.tipoHabitaciones.concat(tipoHabitacionesInput) })
        setTipoHabitacionesInput("");
    }

    function deleteTipoHabitacion(idx) {
        setHotel({ ...hotel, tipoHabitaciones: hotel.tipoHabitaciones.filter((tipoHabitaciones, index) => idx !== index) })
    }


    function deleteInstalacion(idx) {
        setHotel({ ...hotel, instalaciones: hotel.instalaciones.filter((instalaciones, index) => idx !== index) })
    }

    function addInstalaciones() {
        setHotel({ ...hotel, instalaciones: hotel.instalaciones.concat(instalacionesInput) })
        setInstalacionesInput("");
    }

    function validarArrays() {
        if (instalacionesInput.length === 0) {
            return false
        } else {
            return true
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        updateHoteles(hotel, hotelID).then(() => {
            navigate("/dashboardHoteles");
        }).catch(e => console.error({ error: e, msg: "ta malardo" }));
    }

    const getNombreHab = async (id) => {

        return await queryHabitacion(id)
    }


    if (loading) return (
        <div> cargando </div>
    )

    return (
        <form onSubmit={handleSubmit}>
            <label >
                Nombre:
                <input type="text" id='nombre' name="nombre" value={hotel.nombre ?? ""} onChange={onChange} required />
            </label>

            <label >
                Imagen:
                <input name="imagen" value={hotel.imagen ?? ""} onChange={onChange} required />
            </label>

            <label >
                Ranking:
                <select name="ranking" value={hotel.ranking ?? ""} onChange={onChange} required>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </label>

            <div className="arrayContainer">
                <label className="arraysInput">
                    <span>Instalaciones: </span>
                    <input type="text" name="instalaciones" value={instalacionesInput} onChange={(e) => setInstalacionesInput(e.target.value)} />
                    <button onClick={addInstalaciones} type="button">Add</button>
                </label>
                {hotel.instalaciones.map((instalacion, index) => (
                    <>
                        <span>{instalacion}</span>
                        <button onClick={() => deleteInstalacion(index)} type="button">Delete</button>
                    </>
                ))}
            </div>
            <div className="arrayContainer">
                <label className="arraysInput">
                    <span>Tipo de Habitaciones: </span>
                    <input type="text" name="tipoHabitaciones" value={tipoHabitacionesInput} onChange={(e) => setTipoHabitacionesInput(e.target.value)} />
                    <button onClick={addTipoHabitaciones} type="button">Add</button>
                </label>
                {hotel.tipoHabitaciones.map((tipoHabitacion, index) => (
                    <>
                        <span>{getNombreHab(tipoHabitacion.id).nombre}</span>
                        <button onClick={() => deleteTipoHabitacion(index)} type="button">Delete</button>
                    </>
                ))}
            </div>

            <button>Submit</button>

            <div>Porsia te equivocaste de Hotel</div>
            <button onClick={() => navigate(`/dashboardHoteles`)}>Regreso al DashboardHoteles</button>

        </form>

    )
}

export default DashboardEditHotelPage; 