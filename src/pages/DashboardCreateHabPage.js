// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { queryHoteles, updateNewHabitacion } from "../services/hoteles"
// import { createHotel } from "../services/hoteles";


// function DashboardCreateHabPage (){
   
//     const navigate = useNavigate()
//     const [tipoHabitaciones, setTipoHabitaciones] = React.useState({comodidades: [], reservaciones: []})
//     const [loading, setLoading] = React.useState(true)
//     const [comodidadesInput, setcomodidadesInput] = React.useState("");
//     const [tipoHabitacionesInput, setTipoHabitacionesInput] = React.useState("");
//     const [hoteles, setHoteles] = React.useState([])
//     const [hotelID, setHotelID] = React.useState("")
//     const [hotel, setHotel] = React.useState("")

//     function onChange(e) {
//         const formName = e.target.name;
//         const formValue = e.target.value;

//         setHotel(prevHotel => ({ ...prevHotel, [formName]: formValue }));
//     }

//     React.useEffect(() => {

//         setLoading(true)
//         queryHoteles().then((response) => {
//             setHoteles(response)
//             setLoading(false)
//         })

//     }, [])

//     function deleteInstalacion(idx) {
//         setHotel({ ...hotel, comodidades: hotel.comodidades.filter((comodidades, index) => idx !== index )})
//     }       

//     function addcomodidades() {
//         setHotel({ ...hotel, comodidades: hotel.comodidades.concat(tipoHabitacionesInput) })
//         setcomodidadesInput("");
//     }
//     function deleteTipoHabitacion(idx) {
//         setHotel({ ...hotel, tipoHabitaciones: hotel.tipoHabitaciones.filter((tipoHabitaciones, index) => idx !== index )})
//     }       

//     function addTipoHabitaciones() {
//         setHotel({ ...hotel, tipoHabitaciones: hotel.tipoHabitaciones.concat(tipoHabitacionesInput) })
//         setTipoHabitacionesInput("");
//     }
    


//     if (loading) return (
//         <div>
//             Cargandou
//         </div>
//     )

//     return(
        
//         <form>
//             Selecciona el Hotel en donde vas a agregar la Habitacion
//             {/* <select name="hotelID" value= {hoteles.hotelID ?? ""} onChange={GetCiudadId}>
//             {hoteles.map(({ id, nombre }) => (
//                 <>
//                     <option value={id}>{nombre}</option>
//                 </>
//             ))}
//             </select> */}
//             <label > 
//                 Nombre:
//                 <input type="text" id='nombre' name ="nombre" value= {tipoHabitaciones.nombre ?? ""} onChange={onChange} />
//             </label>

//             <label >
//                 camas:
//                 <input name="camas" value= {tipoHabitaciones.camas ?? ""} onChange={onChange} />
//             </label>
//             <label >
//                 capacidad:
//                 <input name="capacidad" value= {tipoHabitaciones.capacidad ?? ""} onChange={onChange} />
//             </label>
//             <label >
//                 cantidad:
//                 <input name="cantidad" value= {tipoHabitaciones.cantidad ?? ""} onChange={onChange} />
//             </label>
//             <label >
//                 Imagen:
//                 <input name="imagen" value= {tipoHabitaciones.imagen ?? ""} onChange={onChange} />
//             </label>

            
//             <div className="arrayContainer">
//                 <label className="arraysInput">
//                     <span>comodidades: </span>
//                     <input type="text" name="comodidades" value={comodidadesInput} onChange={(e) => setcomodidadesInput(e.target.value)} />
//                     <button onClick={addcomodidades} type="button">Add</button>
//                 </label>
//                 {tipoHabitaciones.comodidades.map((instalacion, index) => (
//                     <>
//                         <span>{instalacion}</span>
//                         <button onClick={() => deleteInstalacion(index)} type= "button">Delete</button>
//                     </>
//                 ))}
//             </div>

//             <div className="arrayContainer">
//                 <label className="arraysInput">
//                     <span>Tipo de Habitaciones: </span>
//                     <input type="text" name="tipoHabitaciones" value={tipoHabitacionesInput} onChange={(e) => setTipoHabitacionesInput(e.target.value)} />
//                     <button onClick={addTipoHabitaciones} type="button">Add</button>
//                 </label>
//                 {tipoHabitaciones.tipoHabitaciones.map((tipoHabitacion, index) => (
//                     <>
//                         <span>{tipoHabitacion}</span>
//                         <button onClick={() => deleteTipoHabitacion(index)} type= "button">Delete</button>
//                     </>
//                 ))}
//             </div>

//             <button>Submit</button>
//             <div>Aqui para Devolverse al Dashboard de Hoteles</div>
//         <button className="BotonesNormales" onClick={() => navigate(`/dashboardHoteles`)}>Click!!!</button>
//         </form>

//     )
// }

// export default DashboardCreateHabPage;