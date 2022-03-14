import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Hotel from "../Hotel/Hotel"
import info from "../CiudadesLista/CiudadesLista.json"

function CiudadDetalles() {
    const { ciudadID } = useParams();
    const { id, nombre, descripcion, ambiente, ranking, lugaresImportantes, imagenes, hoteles } = info.ciudades.filter(city => city.id == ciudadID)[0]
    return (<div>
        <h1>{nombre}</h1>
        <p>{descripcion}</p>
        <p>Ambiente: {ambiente}</p>
        <p>Ranking: {ranking}</p>
        <p>Lugares Importantes: {lugaresImportantes.map(lugar => lugar).join(", ")}</p>
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