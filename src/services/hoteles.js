import {db} from '../firebase/credenciales';
import { getDocs, collection, doc, deleteDoc, getDoc, updateDoc, addDoc } from "firebase/firestore";

const collectionHoteles = "hoteles"

const queryHoteles = async () => {

    let hoteles = [];

    await getDocs(collection(db, collectionHoteles)).then((data) => {
        
        data.docs.forEach((element) => {
            hoteles.push({ id: element.id, ...element.data() });
        });
    })
    .catch((error) => {
        console.log(error);
    });
    return hoteles
}

const deleteHotel = async (hotelId) => {

    await deleteDoc(doc(db, collectionHoteles, hotelId));

}

const queryHotel = async (id) => {

    const docRef = doc(db, collectionHoteles, id);
    const docSnap = await getDoc(docRef);
    const hotelData = docSnap.data();
    return hotelData

}

const updateHoteles = async (hotel,hotelID,cityID) => {
    const cityRef = doc(db, collectionHoteles, hotelID)
    await updateDoc(cityRef, {
        ciudadID: cityID,
        nombre: hotel.nombre,
        imagen: hotel.imagen,
        tipoHabitaciones: hotel.tipoHabitaciones,
        nombre: hotel.nombre,
        instalaciones: hotel.instalaciones
    });
}

const updateNewHabitacion = async (tipoHabitacionesID,hotelID) => {
    const hotelRef = doc(db, collectionHoteles, hotelID)
    const docSnap = await getDoc(hotelRef);
    const hotel = docSnap.data();
    await updateDoc(hotelRef, {
        ciudadID: hotel.ciudadID,
        imagen: hotel.imagen,
        nombre: hotel.nombre,
        instalaciones: hotel.instalaciones,
        tipoHabitaciones: [...hotel.tipoHabitaciones, {id: tipoHabitacionesID}]
    });
}

const createHotel = async (hotel) => {

    const nuevoHotel = await addDoc(collection(db, collectionHoteles), hotel)
    return nuevoHotel

}

export {queryHoteles, deleteHotel, queryHotel, updateHoteles,createHotel, updateNewHabitacion};