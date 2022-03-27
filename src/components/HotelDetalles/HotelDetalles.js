import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/credenciales"
import TipoHabitacion from "../TipoHabitacion/TipoHabitacion";
import { CircularProgress } from "@material-ui/core";

function HotelDetalles() {
    const { ciudadID, hotelID } = useParams()

    const [hotel, setHotel] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHotel = async () => {

        const snap = await getDoc(doc(db, 'hoteles', hotelID))

        setHotel(snap.data())
        setLoading(false)
    }

    useEffect(() => {
        fetchHotel();
    }, []);
    const { nombre, ranking, instalaciones, imagen, tipoHabitaciones } = hotel
    return (
        <div>
            {loading ? <CircularProgress/> :
                <div>
                    <h1>{nombre}</h1>
                    <p>Ranking: {ranking}</p>
                    <p>Instalaciones: {instalaciones.join(", ")}</p>
                    <img src={imagen} width="500px"></img>
                    <div>
                    <h2>Habitaciones disponibles</h2>
                    <ul>
                            {tipoHabitaciones.map(tipo => <TipoHabitacion key={tipo.id} tipo={{...tipo, nombreHotel: nombre}} />)}
                        </ul>

                    </div>
                </div>}

        </div>);
}

export default HotelDetalles;