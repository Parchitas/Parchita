import React from "react";
import { useNavigate } from "react-router-dom";
import { queryHoteles, updateNewHabitacion } from "../services/hoteles"
import { createHab } from "../services/habitaciones";
import { Grid, Card, CardContent, TextField, Button, Typography, } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { AddCircle, Block } from "@material-ui/icons";


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
        <><br /><div>
            <Grid container justifyContent="center">
                <Card>
                    <CardContent>
        <form onSubmit={handleSubmit}>
            Selecciona el Hotel en donde agregara la Habitacion
            <Form.Select name="hotelID" value= {tipoHabitaciones.hotelID ?? ""} onChange={GetHotelId}>
            {hoteles.map(({ id, nombre }) => (
                <>
                    <option value={id}>{nombre}</option>
                </>
            ))}
            </Form.Select><br/>
            <label > 
                <TextField type="text" id='nombre' label="Nombre" name="nombre" value={tipoHabitaciones.nombre ?? ""} onChange={onChange} required />
            </label><br/>

            <label >
                <TextField type='text' id='camas' label='Camas' name="camas" value= {tipoHabitaciones.camas ?? ""} onChange={onChange} required/>
            </label><br/>
            <label >
                <TextField type='text' id='capacidad' label='Capacidad' name="capacidad" value= {tipoHabitaciones.capacidad ?? ""} onChange={onChange} required/>
            </label><br/>
            <label >
                <TextField type='cantidad' id='cantidad' label='Cantidad' name="cantidad" value= {tipoHabitaciones.cantidad ?? ""} onChange={onChange} required/>
            </label><br/>
            <label >
                <TextField type="number" id='precioNoche' label='Precio por Noche' name="precioNoche" value= {tipoHabitaciones.precioNoche ?? ""} onChange={onChange} required/>
            </label><br/>

            <div className="arrayContainer">
                <label className="arraysInput">
                    <TextField type="text" id='comodidades' label='Comodidades' name="comodidades" value={comodidadesInput} onChange={(e) => setcomodidadesInput(e.target.value)} />
                    <Button onClick={addcomodidades} type="button"><AddCircle /></Button>
                </label><br/>
                {tipoHabitaciones.comodidades.map((comodidad, index) => (
                    <><Grid container justifyContent="space-between">
                        <Grid item><span>{comodidad}</span></Grid>
                        <Grid item><Button onClick={() => deletecomodidades(index)} type= "button"><Block/></Button>
                    </Grid></Grid></>
                ))}<br/>
            </div>
<Grid container justifyContent="center" spacing={1}><Grid item>
            <Button variant="contained" onClick={handleSubmit}>Guardar</Button></Grid>
        <Grid item><Button variant="contained" className="BotonesNormales" onClick={() => navigate(`/dashboardHoteles`)}>Regresar</Button>
        </Grid></Grid></form>
    </CardContent>
                </Card>
            </Grid>
        </div></>
    )
}

export default DashboardCreateHabPage;
