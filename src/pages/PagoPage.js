//Despues de Reservar o durante la reserva en donde escoge las fechas? Aqui iria metodos de pago
// a
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import moment from "moment"

import PayWithPaypal from '../components/Pagos/Paypal'

function PagoPage() {
    const location = useLocation()
    const { reserva, tipoHabitacion } = location.state

    const totalReserva = tipoHabitacion.precioNoche * (moment(reserva.fechaSalida).diff(moment(reserva.fechaEntrada), 'days')) 

    return (<div>
        <p>Reservación exitosa. (Ahora se procede a pagar por paypal) </p>
        <h1>Detalles Reservación</h1>
        <p>Hotel: {tipoHabitacion.nombreHotel}</p>
        <p>Tipo de habitación:{tipoHabitacion.nombre}</p>
        <p>Precio por noche: {tipoHabitacion.precioNoche}</p>
        <p>Fecha de entrada: {reserva.fechaEntrada}</p>
        <p>Fecha de salida: {reserva.fechaSalida}</p>
        <p>Total a pagar: {totalReserva}</p>
        <PayWithPaypal
            total={totalReserva}
            items={[tipoHabitacion.nombre]}
        />
    </div>);
}

export default PagoPage;