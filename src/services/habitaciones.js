import {db} from '../firebase/credenciales';
import { getDocs, collection, doc, deleteDoc, getDoc, addDoc, updateDoc } from "firebase/firestore";

const collectionHab = "tipohabitaciones"

const queryHabitacion = async (id) => {

    const docRef = doc(db, collectionHab, id);
    const docSnap = await getDoc(docRef);
    const habData = docSnap.data();
    return habData

}

export { queryHabitacion }