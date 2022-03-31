import React from "react";
import { useNavigate } from "react-router-dom";
import { queryCiudades, updateNewHotel } from "../services/ciudades"
import { createHotel } from "../services/hoteles";


function DashboardCreateHotelesPage() {

    const navigate = useNavigate()
    const [hotel, setHotel] = React.useState({ ranking: "0", instalaciones: [], tipoHabitaciones: [] })
    const [loading, setLoading] = React.useState(true)
    const [instalacionesInput, setInstalacionesInput] = React.useState("");
    const [tipoHabitacionesInput, setTipoHabitacionesInput] = React.useState("");
    const [ciudades, setCiudades] = React.useState([])
    const [cityID, setCiudadID] = React.useState("")

    function onChange(e) {
        const formName = e.target.name;
        const formValue = e.target.value;

        setHotel(prevHotel => ({ ...prevHotel, "ciudadID": cityID, [formName]: formValue }));
    }

    React.useEffect(() => {

        setLoading(true)
        queryCiudades().then((response) => {
            setCiudades(response)
            setLoading(false)
        })

    }, [])

    function deleteInstalacion(idx) {
        setHotel({ ...hotel, instalaciones: hotel.instalaciones.filter((instalaciones, index) => idx !== index) })
    }

    function addInstalaciones() {
        setHotel({ ...hotel, instalaciones: hotel.instalaciones.concat(tipoHabitacionesInput) })
        setInstalacionesInput("");
    }
    function deleteTipoHabitacion(idx) {
        setHotel({ ...hotel, tipoHabitaciones: hotel.tipoHabitaciones.filter((tipoHabitaciones, index) => idx !== index) })
    }

    function addTipoHabitaciones() {
        setHotel({ ...hotel, tipoHabitaciones: hotel.tipoHabitaciones.concat(tipoHabitacionesInput) })
        setTipoHabitacionesInput("");
    }

    function GetCiudadId(e) {
        console.log(e.target.value)
        setCiudadID(e.target.value)
    }



    if (loading) return (
        <div>
            Cargandou
        </div>
    )

    function validarArrays() {
        if (hotel.instalaciones.length === 0 || hotel.tipoHabitaciones.length === 0) {
            return false
        } else {
            return true
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (validarArrays()) {
            createHotel(hotel).then((response) => {
                updateNewHotel(cityID, response.id)
                navigate("/dashboardHoteles")
            })
        } else {

        }
    }

    return (

        <form onSubmit={handleSubmit}>
            Selecciona la Ciudad en donde vas a agregar el Hotel
            <select name="ciudadID" value={ciudades.ciudadID ?? ""} onChange={GetCiudadId}>
                {ciudades.map(({ id, nombre }) => (
                    <>
                        <option value={id}>{nombre}</option>
                    </>
                ))}
            </select>
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
                        <span>{tipoHabitacion}</span>
                        <button onClick={() => deleteTipoHabitacion(index)} type="button">Delete</button>
                    </>
                ))}
            </div>

            <button>Submit</button>
            <div>Aqui para Devolverse al Dashboard de Hoteles</div>
            <button className="BotonesNormales" onClick={() => navigate(`/dashboardHoteles`)}>Click!!!</button>
        </form>

    )
}

export default DashboardCreateHotelesPage;