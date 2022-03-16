import React from "react"
import { useParams, useLocation } from "react-router-dom";
import Hotel from "../Hotel/Hotel"
import info from "../CiudadesLista/CiudadesLista.json"

function CiudadDetalles() {
    const { ciudadID } = useParams();
    const location = useLocation()
    const { ciudad } = location.state
    console.log(ciudad.props.ciudad)
    const { id, nombre, descripcion, ambiente, ranking, lugaresInteres, imagenes, hoteles } = ciudad.props.ciudad
    return (<div>
        <h1>{nombre}</h1>
        <p>{descripcion}</p>
        <p>Ambiente: {ambiente}</p>
        <p>Ranking: {ranking}</p>
        <p>Lugares Importantes: {lugaresInteres.join(", ")}</p>
        <div>
            {imagenes.map(imagen => <img src={imagen} width="300px"></img>)}
        </div>

        <div>
            <h2>Hoteles</h2>
            <ul>

                {hoteles.map((hotel) =>
                    <Hotel key={hotel.id} hotel={hotel} />
                )}
            </ul>
        </div>
    </div>);
}

export default CiudadDetalles;