import React from "react"
import { useParams } from "react-router-dom";
import info from "../CiudadesLista/CiudadesLista.json"

function HotelDetalles() {
    const { ciudadID, hotelID } = useParams()
    const ciudad = info.ciudades.filter(city => city.id == ciudadID)[0]
    console.log(ciudad)
    const { nombre } = ciudad.hoteles.filter(hotely => hotely.id == hotelID)[0]
     return (
        <div>
            <h1>Nombre: {nombre}</h1>
        </div>);
}

export default HotelDetalles;