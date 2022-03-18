import React, { useState } from "react"
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./../firebase/credenciales";
import { useLocation } from "react-router-dom"



function ReservaPage() {
    
    const [values, setValues] = useState({
        fechaEntrada: "",
        fechaSalida: "",
    });

    const handleOnChange = (event) => {
        const { value, name: inputName } = event.target;
        setValues({ ...values, [inputName]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values)
        const newReservacionRef = doc(collection(db, "reservaciones"));
        await setDoc(newReservacionRef, values);
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