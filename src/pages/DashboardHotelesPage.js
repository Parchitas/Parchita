import React from "react";
import { map } from "@firebase/util";
import '../css/dashboardCiudades.css'
import { queryHoteles, deleteHotel } from "../services/hoteles"
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { Button, Grid, Typography } from "@mui/material";


function DashboardHotelesPage() {

    const [hoteles, setHoteles] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()

    React.useEffect(() => {

        setLoading(true)
        queryHoteles().then((response) => {
            setHoteles(response)
            setLoading(false)
        })

    }, [])

    const handleDelete = (hotelId) => {
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
                    deleteHotel(hotelId).then(() => {
                        setHoteles(hoteles.filter(hotel => hotelId != hotel.id))
                        setLoading(false)
                    })
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }

    return (
        <div className="imagenFondo">
            <div className="cont">
                <div className="contenedor">
        <div className="container">
            {loading ? <div>cargando</div> : null}<br/><div><Grid container justifyContent='center' spacing={20}><Grid item>
            {hoteles.map(({ id, nombre }) => (
                <>
                    <div className="data">
                        <div className="hoteles">{nombre}</div>
                        <div className="botonesContainer"><Grid container justifyContent='center' spacing={0.5}>
                            <Grid item><Button variant="contained" color="success" onClick={() => navigate(`/dashboardHoteles/${id}`)}> Editar </Button></Grid>
                            <Grid item><Button variant="contained" color="error" onClick={(() => { handleDelete(id) })}> Eliminar </Button></Grid>
                        </Grid></div>
                    </div>
                </>
            ))}</Grid><Grid item><Typography align="right">
                                <Button className="BotonesNormales" variant="contained" onClick={() => navigate(`/dashboardHabitaciones`)}>Modificar Habitaciones <br/>de Hoteles</Button><br/><br/>
            <Button variant="contained" onClick={() => navigate(`/dashboardHoteles/create`)}>Agregar nuevo Hotel</Button><br/><br/>
            <Button className="BotonesNormales" variant="contained" onClick={() => navigate(`/dashboard`)}>Regresar</Button>
            </Typography>
        </Grid></Grid></div></div></div></div></div>
    );
}

export default DashboardHotelesPage;