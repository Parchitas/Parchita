import React, { useState, useContext } from "react"
import { collection, doc, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "./../firebase/credenciales";
import { Card, CardContent, Box, Button, Typography, TextField } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { sessionContext } from "../context/SessionContext";
import moment from "moment"


function ReservaPage() {

    const location = useLocation()
    const { tipoHabitacion } = location.state
    const { session } = useContext(sessionContext)
    console.log(tipoHabitacion)
    console.log(tipoHabitacion.id)
    const navigate = useNavigate()


    const [values, setValues] = useState({
        fechaEntrada: "",
        fechaSalida: "",
        idCliente: session.id
    });

    const [mensaje, setMensaje] = useState("");

    const handleOnChange = (event) => {
        setMensaje("")
        const { value, name: inputName } = event.target;
        setValues({ ...values, [inputName]: value });
    }

    const checkDisponibilidad = () => {
        const reservaciones = tipoHabitacion.reservaciones
        for (let i = 0; i < reservaciones.length; i++) {

            if (moment(reservaciones[i].fechaEntrada).isBetween(moment(values.fechaEntrada), moment(values.fechaSalida), undefined, "[)") ||
                moment(reservaciones[i].fechaSalida).isBetween(moment(values.fechaEntrada), moment(values.fechaSalida), undefined, "(]")
            ) {
                return false
            }
        }
        return true
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (checkDisponibilidad() && (moment(values.fechaEntrada) < moment(values.fechaSalida))) {
            const newReservacionRef = await doc(db, 'tipohabitaciones', tipoHabitacion.id)
            await updateDoc(newReservacionRef, {
                reservaciones: arrayUnion(values)
            });
            navigate("../pago", {
                state: {
                    reserva: values,
                    tipoHabitacion: tipoHabitacion
                }
            })
        } else {
            setMensaje("La fecha no está disponible. Por favor, selecciona otra.")
        }

    };

    return (<><br /><div >
        <Box 
            sx={{
                mx: "auto",
                width: 400,
                height: 400,
                        
                    }}
                >
        <Card><CardContent>
        <h1>Pagina reserva</h1><br/>
        <form onSubmit={handleSubmit}><Typography align="center">
            <div>
                <label for="fechaEntrada">Fecha Entrada: </label><br/>
                <TextField variant="outlined" 
                    name="fechaEntrada"
                    id="fechaEntrada"
                    type="date"
                    min={moment().format("YYYY-MM-DD")}
                    value={values.fechaEntrada}
                    onChange={handleOnChange}
                />

            </div><br/>
            <div>
                <label for="fechaSalida">Fecha Salida: </label><br/>
                <TextField variant="outlined" 
                    name="fechaSalida"
                    id="fechaSalida"
                    type="date"
                    min={moment(values.fechaEntrada).add(1, 'days').format("YYYY-MM-DD")}
                    value={values.fechaSalida}
                    onChange={handleOnChange}
                />
            </div>
            <div>
                <p style={{ color: "red" }}>{mensaje}</p>
            </div>
            <div><br/><Typography align="right">
                <Button variant="contained" type="submit" onClick={handleSubmit}>
                    Reservar
                </Button>
            </Typography>
            </div>
        </Typography>
        </form></CardContent></Card></Box></div>
    </>);
}

export default ReservaPage;
