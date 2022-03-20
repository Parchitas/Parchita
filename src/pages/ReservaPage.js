import React, { useContext, useState } from "react"
import { collection, doc, setDoc, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./../firebase/credenciales";
import { useLocation } from "react-router-dom"
import { sessionContext } from '../context/SessionContext'

function ReservaPage() {


    const { session } = useContext(sessionContext)
    console.log(session.id)
    const location = useLocation()
    const habitacion = location.state.habitacion
    console.log(habitacion)

    const [values, setValues] = useState({
        fechaEntrada: "",
        fechaSalida: "",
        idCliente: session.id,
        idHabitacion: habitacion.id
    });

    const handleOnChange = (event) => {
        const { value, name: inputName } = event.target;
        setValues({ ...values, [inputName]: value });
    }

    function intercept(start1, end1, start2, end2) {
        return (Math.max(0, Math.min(end2, end1) - Math.max(start1, start2) + 1)) > 0
    }

    const checkDisponible = async () => {
        const q = query(collection(db, "reservaciones"), where("idHabitacion", "==", habitacion.id));
        const habitaciones = [];
        const disponible = true
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                habitaciones.push(doc.data());
            });
        });;

        console.log(habitaciones)
        for (let i = 0; i < habitaciones.length; i++) {
            if (intercept(new Date(values.fechaEntrada), new Date(values.fechaSalida), habitaciones[i].fechaEntrada, habitaciones[i].fechaSalida)) {
                disponible = false
                console.log(disponible)
                break
            }
            console.log(disponible)
        }

        return disponible
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values)
        if (checkDisponible()) {
            const newReservacionRef = doc(collection(db, "reservaciones"));
            await setDoc(newReservacionRef, values)
        }
    };

    return (<div>
        <h1>Pagina reserva</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label for="fechaEntrada">Fecha Entrada: </label>
                <input
                    name="fechaEntrada"
                    id="fechaEntrada"
                    type="date"
                    value={values.fechaEntrada}
                    onChange={handleOnChange}
                />

            </div>
            <div>
                <label for="fechaSalida">Fecha Salida: </label>
                <input
                    name="fechaSalida"
                    id="fechaSalida"
                    type="date"
                    value={values.fechaSalida}
                    onChange={handleOnChange}
                />
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>
                    Reservar
                </button>
            </div>

        </form>
    </div>);
}

export default ReservaPage;
