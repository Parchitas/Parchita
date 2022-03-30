//Despues de Reservar o durante la reserva en donde escoge las fechas? Aqui iria metodos de pago
// a
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, Box, Button, Typography, TextField } from "@mui/material";
import moment from "moment"

import PayWithPaypal from '../components/Pagos/Paypal'

function PagoPage() {
    const location = useLocation()
    const { reserva, tipoHabitacion } = location.state

    const totalReserva = tipoHabitacion.precioNoche * (moment(reserva.fechaSalida).diff(moment(reserva.fechaEntrada), 'days')) 

    return (<><p>Reservación exitosa.(Ahora se procede a pagar por paypal) </p>
        <br /><div>
        <Box
            sx={{
                mx: "auto",
                width: 400,
                height: 400,
            }}
        >
                <Card>
                    <CardContent>
                        <div>
                            <Typography align="right">
                                <h1>Reservación</h1>
                            </Typography>
                            <Typography variant="h6" align="left">
                                <Box sx={{ lineHeight: 2}}>
                                    Hotel: {tipoHabitacion.nombreHotel}<br />
                                    
                                    Tipo de habitación:{tipoHabitacion.nombre}<br />
                                    
                                    Precio por noche: ${tipoHabitacion.precioNoche}<br />
                                    
                                    Fecha de entrada: {reserva.fechaEntrada}<br />
                                    
                                    Fecha de salida: {reserva.fechaSalida}<br />
                                    
                                    Total a pagar: ${totalReserva}<br />
                                </Box><br />
                            
                                <PayWithPaypal
                                    total={totalReserva}
                                    items={[tipoHabitacion.nombre]} />
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
        </Box></div>
                            </>);
                    }

export default PagoPage;