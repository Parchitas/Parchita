import React, { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import "../../css/Search.css"
import SearchIcon from "@material-ui/icons/Search";
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
            <div className="searchContent">
                <input className="search" type="text" placeholder="  🔍    Buscar ciudad"value={text} onChange={(event) => setText(event.target.value)} />
                <button className="buscar" type="submit" ><SearchIcon/></button>
            </div>
        </form>);
}

export default Search;