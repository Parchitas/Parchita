import React from 'react';
import Ciudad from "../Ciudad/Ciudad";

function CiudadesLista({ ciudades }) {

    return (<ul>
        {ciudades.map(ciudad => <Ciudad key={ciudad.id} ciudad={ciudad} />)}
    </ul> );
}

export default CiudadesLista;