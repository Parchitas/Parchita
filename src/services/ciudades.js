import { db } from '../firebase/credenciales';
import { getDocs, collection, doc, deleteDoc, getDoc, addDoc, updateDoc } from "firebase/firestore";

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

const queryCiudades2 = async () => {

    const arr = [];
    await getDocs(collection(db, "ciudades"))
        .then((data) => {
            data.docs.forEach((element) => {
                arr.push({ id: element.id, ...element.data(), });
            });
            return arr
        })
        .catch((error) => {
            console.log(error);
        });
        console.log(arr)
    
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

const updateCiudad = async (ciudad, ciudadID) => {

    const cityRef = doc(db, collectionCiudades, ciudadID)
    await updateDoc(cityRef, {
        nombre: ciudad.nombre,
        descripcion: ciudad.descripcion,
        ranking: ciudad.ranking,
        nombrelower: ciudad.nombre.toLowerCase(),
        ambiente: ciudad.ambiente,
        imagenes: ciudad.imagenes,
        lugaresInteres: ciudad.lugaresInteres,
        hoteles: ciudad.hoteles
    });
}

const updateNewHotel = async (ciudadID, hotelID) => {

    const cityRef = doc(db, collectionCiudades, ciudadID)
    const docSnap = await getDoc(cityRef);
    const ciudad = docSnap.data();
    await updateDoc(cityRef, {
        nombre: ciudad.nombre,
        descripcion: ciudad.descripcion,
        ranking: ciudad.ranking,
        nombrelower: ciudad.nombre.toLowerCase(),
        ambiente: ciudad.ambiente,
        imagenes: ciudad.imagenes,
        lugaresInteres: ciudad.lugaresInteres,
        hoteles: [...ciudad.hoteles, { id: hotelID }]
    });
}


const createCiudad = async (ciudad) => {

    const newCiudad = { ...ciudad, nombrelower: ciudad.nombre.toLowerCase() }
    const nuevaCiudad = await addDoc(collection(db, collectionCiudades), newCiudad)
    return nuevaCiudad

}

export { createCiudad, queryCiudades, deleteCiudad, queryCiudad, updateCiudad, updateNewHotel, queryCiudades2 };