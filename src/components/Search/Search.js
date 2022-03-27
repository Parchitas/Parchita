import React, { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"

function Search() {
    const [text, setText] = useState("");
    const [query, setQuery] = useSearchParams();
    const search = query.get("search");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        //setQuery({ search: text });
        navigate("/ciudades?search=" + text)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input  type="text" value={text} onChange={(event) => setText(event.target.value)} />
                <button type="submit" >Buscar ciudad</button>
            </div>
        </form>);
}

export default Search;