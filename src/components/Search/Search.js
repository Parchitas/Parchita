import React, { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { ButtonGroup, Button, TextField, Typography } from "@mui/material"
import SearchRounded from '@material-ui/icons/SearchRounded';

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
            <Typography>
                <ButtonGroup  variant="outlined" size="small" aria-label="outlined button group">
                    <TextField label="Buscar ciudad" variant="filled" onChange={(event) => setText(event.target.value)}  />
                    <Button size="small" type="submit"><SearchRounded/></Button>      
                </ButtonGroup>
            </Typography>
        </form>);
}

export default Search;