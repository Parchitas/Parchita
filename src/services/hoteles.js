import {db} from '../firebase/credenciales';
import { getDocs, collection, doc, deleteDoc, getDoc } from "firebase/firestore";

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

export {queryHoteles, deleteHotel, queryHotel};