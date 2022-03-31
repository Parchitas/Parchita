import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { queryHotel, updateHoteles } from "../services/hoteles"
import { queryHabitacion } from "../services/habitaciones";
import { Grid, Card, CardContent, TextField, Button, Typography, } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { AddCircle, Block } from "@material-ui/icons";


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
        <><br /><div>
            <Grid container justifyContent="center">
                <Card>
                    <CardContent>
        <form onSubmit={handleSubmit}>
            <label >
                <TextField type="text" id='nombre' label="Nombre" name="nombre" value={hotel.nombre ?? ""} onChange={onChange} required />
            </label><br/>

            <label >
                <TextField type="text" id='imagen' label="URL de Imagen" name="imagen" value={hotel.imagen ?? ""} onChange={onChange} required />
            </label><br/><br/>

            <Typography align="center">
            <label >
                Ranking:
                                    <Form.Select name="ranking" value={hotel.ranking ?? ""} onChange={onChange} required>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Form.Select>
            </label></Typography><br/>

            <div className="arrayContainer">
                <label className="arraysInput">
                    
                    <TextField type="text" id="instalaciones" name="instalaciones" label="Instalaciones" value={instalacionesInput} onChange={(e) => setInstalacionesInput(e.target.value)} />
                    <Button onClick={addInstalaciones} type="button"><AddCircle /></Button>
                </label><br/>
                {hotel.instalaciones.map((instalacion, index) => (
                    <><Grid container justifyContent="space-between">
                        <Grid item><span>{instalacion}</span></Grid>
                        <Grid item><Button onClick={() => deleteInstalacion(index)} type="button"><Block/></Button>
                    </Grid></Grid></>
                ))}<br/>
            </div>
            <div className="arrayContainer">
                <label className="arraysInput">
                    
                    <TextField type="tipoHabitaciones" id='imagen' label="Tipo de Habitaciones" name="tipoHabitaciones" value={tipoHabitacionesInput} onChange={(e) => setTipoHabitacionesInput(e.target.value)} />
                    <Button onClick={addTipoHabitaciones} type="button"><AddCircle /></Button>
                </label><br/>
                {hotel.tipoHabitaciones.map((tipoHabitacion, index) => (
                    <><Grid container justifyContent="space-between">
                        <Grid item><span>{getNombreHab(tipoHabitacion.id).nombre}</span></Grid>
                        <Grid item><Button onClick={() => deleteTipoHabitacion(index)} type="button"><Block/></Button>
                    </Grid></Grid></>
                ))}<br/>
            </div>
<Grid container justifyContent="center" spacing={1}>
                                <Grid item>
            <Button variant='contained' onClick={handleSubmit}>Guardar</Button></Grid>
            <Grid item><Button variant='contained' onClick={() => navigate(`/dashboardHoteles`)}>Regresar</Button></Grid>
</Grid>
        </form>
        </CardContent>
                </Card>
            </Grid>
        </div></>

    )
}

export default DashboardEditHotelPage; 