import React, { useState, useEffect } from "react"
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebase/credenciales"
import { useNavigate } from "react-router-dom"

function TipoHabitacion(props) {

    const { tipo } = props
    const { id, nombreHotel } = tipo
    const navigate = useNavigate()

    const [tipoHab, setTipoHab] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTipoHab = async () => {

        const snap = await getDoc(doc(db, 'tipohabitaciones', id))

        setTipoHab(snap.data())
        setLoading(false)
    }

    useEffect(() => {
        fetchTipoHab();
    }, []);
    console.log(tipoHab)
    const { nombre, camas, capacidad, comodidades, precioNoche, reservaciones } = tipoHab

    const handleClick = () => {
        console.log("Reservando...")
        console.log(id)
        navigate("../reservar", {
            state: {
                tipoHabitacion: { ...tipoHab, id: id, nombreHotel: nombreHotel}
            }
        })
    }

    return (<div>
        {loading ? <div></div> :
            <li style={{ margin: "20px" }}>
                <h3><strong>{nombre}</strong></h3>
                <h3>$ {precioNoche}</h3>
                <h3>{camas}</h3>
                <h3>Capacidad: {capacidad}</h3>
                <h3>Comodidades: {comodidades.join(", ")}</h3>
                <button onClick={handleClick}>Reservar</button>
            </li>}
    </div>);
}

export default TipoHabitacion;