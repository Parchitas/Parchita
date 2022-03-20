import React, { useState, useEffect } from "react"
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/credenciales"
import { useNavigate } from "react-router-dom"

function TipoHabitacion(props) {

    const { tipo } = props
    //console.log(props)
    //console.log(tipo)
    const { id } = tipo
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
    const { nombre, camas, capacidad, comodidades, precioNoche } = tipoHab

    const handleClick = () => {
        console.log("Reservando...")
        navigate("../reservar", {
            state: {
                habitacion: {...tipoHab, id: id}
            }
        })
    }

    return (<div>
        {loading ? <div></div> :
            <li style={{ margin: "20px" }}>
                <h3><strong>{nombre}</strong></h3>
                <p>$ {precioNoche}</p>
                <p>{camas}</p>
                <p>Capacidad: {capacidad}</p>
                <p>Comodidades: {comodidades.join(", ")}</p>
                <button onClick={handleClick}>Reservar</button>
            </li>}
    </div>);
}

export default TipoHabitacion;