import {db} from '../firebase/credenciales';
import { getDocs, collection, doc, deleteDoc, getDoc, createId, updateDoc } from "firebase/firestore";

const collectionCiudades = "ciudades"

const queryCiudades = async () => {

    let ciudades = [];

    await getDocs(collection(db, collectionCiudades)).then((data) => {
        
        data.docs.forEach((element) => {
            ciudades.push({ id: element.id, ...element.data() });
        });
    })
    .catch((error) => {
        console.log(error);
    });
    return ciudades
}

const deleteCiudad = async (ciudadId) => {

    await deleteDoc(doc(db, collectionCiudades, ciudadId));

}

const queryCiudad = async (id) => {

    const docRef = doc(db, collectionCiudades, id);
    const docSnap = await getDoc(docRef);
    const cityData = docSnap.data();
    return cityData

}

const updateCiudad = async (ciudad,ciudadID) => {
    console.log(ciudad)
    const cityRef = doc(db, collectionCiudades, ciudadID)
    await updateDoc(cityRef, {
        nombre: ciudad.nombre,
        descripcion: ciudad.descripcion
    });
}

const createCiudad = (nombre, descripcion) => {

    const newId = db.createId();
    db.collection(collectionCiudades).doc(newId).set({
    nombre,
    descripcion
    })
}

export {createCiudad, queryCiudades, deleteCiudad, queryCiudad, updateCiudad};