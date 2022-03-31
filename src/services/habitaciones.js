import {db} from '../firebase/credenciales';
import {  collection, doc,  getDoc, addDoc } from "firebase/firestore";

const collectionHab = "tipohabitaciones"

const queryHabitacion = async (id) => {

    const docRef = doc(db, collectionHab, id);
    const docSnap = await getDoc(docRef);
    const habData = docSnap.data();
    return habData

}

const createHab = async (tipoHabitaciones) => {
    
    const nuevaHabitacion = await addDoc(collection(db, collectionHab), tipoHabitaciones)
    return nuevaHabitacion
}

export { queryHabitacion, createHab }
