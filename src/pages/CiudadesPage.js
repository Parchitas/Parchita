import React, { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/credenciales"
import CiudadesLista from "../components/CiudadesLista/CiudadesLista";


function CiudadesPage() {
    const [ciudades, setCiudades] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCiudades = async () => {
        await getDocs(collection(db, "ciudades"))
            .then((data) => {
                const arr = [];

                data.docs.forEach((element) => {
                    arr.push({ id: element.id , ...element.data(),});
                });
                setCiudades(arr);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });;
    }

    useEffect(() => {
        fetchCiudades();
    }, []);

    return (<div>
        {loading ? <div> Cargando </div> :
            <div>
                <h1>Ciudades</h1>
                <CiudadesLista ciudades={ciudades} />
            </div>
        }
    </div>);
}

export default CiudadesPage;