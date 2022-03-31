import React, { useState, useEffect } from "react"
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase/credenciales"
import CiudadesLista from "../components/CiudadesLista/CiudadesLista";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core"
import "../css/ciudadesPage.css"

function CiudadesPage() {
    const [ciudades, setCiudades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [consulta, setConsulta] = useSearchParams();
    const search = consulta.get("search")

    const fetchCiudades = async () => {
        if (search == null || search === "") {
            await getDocs(collection(db, "ciudades"))
                .then((data) => {
                    const arr = [];

                    data.docs.forEach((element) => {
                        arr.push({ id: element.id, ...element.data(), });
                    });
                    setCiudades(arr);
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                });;
            
        } else {
            const q = query(collection(db, "ciudades"), where("nombrelower", "==", search.toLowerCase()));

            await getDocs(q)
                .then((data) => {
                    const arr = [];

                    data.docs.forEach((element) => {
                        arr.push({ id: element.id, ...element.data(), });
                    });
                    setCiudades(arr);
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                });;
        }


    }

    useEffect(() => {
        fetchCiudades();
    }, [search]);


    return (<div className="contenedorCiudades">
        {loading ? <CircularProgress /> :
            <div className="contenedorInterno">
                {(ciudades.length === 0) ? <div className="noSeEncuentra"><div className="centro">No se encontraron ciudades</div></div> :
                    <div >
                        <div className="titulo">
                            <h1>CIUDADES</h1>
                        </div>
                        <CiudadesLista ciudades={ciudades} />
                    </div>}

            </div>
        }
    </div >);
}

export default CiudadesPage;

