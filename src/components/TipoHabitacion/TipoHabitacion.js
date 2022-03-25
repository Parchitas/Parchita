import React, { useState, useEffect } from "react"
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebase/credenciales"
import { useNavigate } from "react-router-dom"
import pago from "../Pagos/CallPaypal";
// import { useNavigation } from '@react-navigation/native';



function TipoHabitacion(props) {

    const { tipo } = props
    const { id } = tipo
    const navigate = useNavigate()
    // const navigation = useNavigation();

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
    const { nombre, camas, capacidad, comodidades, precioNoche} = tipoHab

    const handleClick = () => {

        console.log("Reservando...")
        console.log( nombre)
        navigate("/Pagos/CallPaypal", {
            name: nombre,
            valor: precioNoche,
          });
        //navigate("/Pagos/CallPaypal" )
    }
    
    return (<div>
        {loading ? <div></div> :
            <li style={{margin: "20px"}}>
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