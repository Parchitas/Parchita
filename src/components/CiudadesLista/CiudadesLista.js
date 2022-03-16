import React from 'react';
import Ciudad from "../Ciudad/Ciudad";
import info from "./CiudadesLista.json";

function CiudadesLista({ ciudades }) {

    //const { ciudades } = info;
    //console.log(ciudades[0].ambiente)

    return (<ul>
        {ciudades.map(ciudad => <Ciudad key={ciudad.id} ciudad={ciudad} />)}
    </ul> );
}

export default CiudadesLista;