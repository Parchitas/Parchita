import React from "react"
import { useParams, Link } from "react-router-dom"

function Hotel(props) {
    const { ciudadID } = useParams()
    const {id, nombre} = props.hotel
    return ( <li>
        <Link to={"/ciudades/" + ciudadID + "/hoteles/" + id}>
            <h3>{nombre}</h3>
        </Link>
    </li> );
}

export default Hotel;