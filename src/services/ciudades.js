import {db} from '../firebase/credenciales';
import { getDocs, collection, doc, deleteDoc, getDoc } from "firebase/firestore";

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

export {queryCiudades, deleteCiudad, queryCiudad};