import React from "react";
import { useNavigate } from "react-router-dom";
import { queryHoteles, updateNewHabitacion } from "../services/hoteles"
import { createHab } from "../services/habitaciones";


function DashboardCreateHabPage (){
   
    const navigate = useNavigate()
    const [tipoHabitaciones, setTipoHabitaciones] = React.useState({ comodidades: [], reservaciones: []})
    const [loading, setLoading] = React.useState(true)
    const [comodidadesInput, setcomodidadesInput] = React.useState("");
    const [hoteles, setHoteles] = React.useState([]);
    const [hotelID, setHotelID] = React.useState("");

    function onChange(e) {
        const formName = e.target.name;
        const formValue = e.target.value;
        setTipoHabitaciones(prevHab => ({ ...prevHab, "hotelID": hotelID, [formName]: formValue }));
    }

    React.useEffect(() => {

        setLoading(true)
        queryHoteles().then((response) => {
            setHoteles(response)
            setLoading(false)
        })

    }, [])

    function addcomodidades() {
        setTipoHabitaciones({ ...tipoHabitaciones, comodidades: tipoHabitaciones.comodidades.concat(comodidadesInput) })
        setcomodidadesInput("");
    }
    function deletecomodidades(idx) {
        setTipoHabitaciones({ ...tipoHabitaciones, comodidades: tipoHabitaciones.comodidades.filter((comodidades, index) => idx !== index )})
    }       

    function GetHotelId(e){
        console.log(e.target.value)
        setHotelID(e.target.value)
    }

    function validarArrays(){
        if (tipoHabitaciones.comodidades === 0){
            return false
        } else{
            return true
        }
    
    }

    function handleSubmit(e){
        e.preventDefault();
        
        createHab(tipoHabitaciones).then((response) =>{
            updateNewHabitacion(response.id,hotelID)
            navigate("/dashboardHabitaciones")
        })
    }

    if (loading) return (
        <div>
            Cargandou
        </div>
    )

    return(
        
        <form onSubmit={handleSubmit}>
            Selecciona el Hotel en donde vas a agregar la Habitacion
            <select name="hotelID" value= {tipoHabitaciones.hotelID ?? ""} onChange={GetHotelId}>
            {hoteles.map(({ id, nombre }) => (
                <>
                    <option value={id}>{nombre}</option>
                </>
            ))}
            </select>
            <label > 
                Nombre:
                <input type="text" id='nombre' name ="nombre" value= {tipoHabitaciones.nombre ?? ""} onChange={onChange} required/>
            </label>

            <label >
                Camas:
                <input name="camas" value= {tipoHabitaciones.camas ?? ""} onChange={onChange} required/>
            </label>
            <label >
                Capacidad:
                <input name="capacidad" value= {tipoHabitaciones.capacidad ?? ""} onChange={onChange} required/>
            </label>
            <label >
                Cantidad:
                <input name="cantidad" value= {tipoHabitaciones.cantidad ?? ""} onChange={onChange} required/>
            </label>
            <label >
                precioNoche:
                <input type="number" name="precioNoche" value= {tipoHabitaciones.precioNoche ?? ""} onChange={onChange} required/>
            </label>

            <div className="arrayContainer">
                <label className="arraysInput">
                    <span>Comodidades: </span>
                    <input type="text" name="comodidades" value={comodidadesInput} onChange={(e) => setcomodidadesInput(e.target.value)} />
                    <button onClick={addcomodidades} type="button">Add</button>
                </label>
                {tipoHabitaciones.comodidades.map((comodidad, index) => (
                    <>
                        <span>{comodidad}</span>
                        <button onClick={() => deletecomodidades(index)} type= "button">Delete</button>
                    </>
                ))}
            </div>

            <button>Submit</button>
            <div>Aqui para Devolverse al Dashboard de Hoteles</div>
        <button className="BotonesNormales" onClick={() => navigate(`/dashboardHoteles`)}>Click!!!</button>
        </form>

    )
}

export default DashboardCreateHabPage;
