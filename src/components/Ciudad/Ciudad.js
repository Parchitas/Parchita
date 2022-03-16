import React from 'react';
import { Link } from "react-router-dom"

function Ciudad(props) {

    const { id, nombre, ambiente, ranking, imagenes } = props.ciudad;
    //const nombreUrl = nombre.toLowerCase().replace(" ","-")
    return (
        
        <li style={{ margin: "20px" }} >
            <Link to={"/ciudades/" + id} state={{ciudad : {props}}}>
                <img src={imagenes[0]} width="250px"></img>
            </Link>
            <h1 h1 > {nombre}</h1 >
            <p>Ambiente: {ambiente}</p>
            <p>Ranking: {ranking}</p>
        </li >
    )

}

export default Ciudad;