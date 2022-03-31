import React from "react";
import { createCiudad } from "../services/ciudades"
import '../css/DashboardCreateCiudadesPage.css';
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, TextField, Button, Typography, } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { AddCircle } from "@material-ui/icons";


function DashboardCreateCiudades() {

    const [ciudad, setCiudad] = React.useState({ ranking: "0", lugaresInteres: [], imagenes: [], hoteles: [] })
    const [loading, setLoading] = React.useState(true)
    const [lugarInteresInput, setLugarInteresInput] = React.useState("");
    const [imagenesInput, setImagenesInput] = React.useState("");
    const navigate = useNavigate()

    function onChange(e) {
        const formName = e.target.name;
        const formValue = e.target.value;

        setCiudad(prevCiudad => ({ ...prevCiudad, [formName]: formValue }));
    }

    function deleteLugarInteres(idx) {
        setCiudad({ ...ciudad, lugaresInteres: ciudad.lugaresInteres.filter((lugarInteres, index) => idx !== index) })
    }

    function addLugarInteres() {
        setCiudad({ ...ciudad, lugaresInteres: ciudad.lugaresInteres.concat(lugarInteresInput) })
        setLugarInteresInput("");
    }

    function deleteImagenes(idx) {
        setCiudad({ ...ciudad, imagenes: ciudad.imagenes.filter((lugarInteres, index) => idx !== index) })
    }

    function addImagenes() {
        setCiudad({ ...ciudad, imagenes: ciudad.imagenes.concat(imagenesInput) })
        setImagenesInput("");
    }
    function validarArrays() {
        if (ciudad.imagenes === 0 || ciudad.lugaresInteres === 0) {
            return false;
        } else {
            return true
        }

    }


    function handleSubmit(e) {
        e.preventDefault();

        if (validarArrays()) {
            createCiudad(ciudad).then(() => {
                navigate("/dashboardCiudades")
            })
        }

    }

    return (
        <><br /><div>
            <Grid container justifyContent="center">
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <TextField type="text" id='nombre' label="Nombre" name="nombre" value={ciudad.nombre ?? ""} onChange={onChange} required />
                            </label>
                            <br />
                            <label>
                                <TextField type="text" id="descripcion" label="Descripcion" name="descripcion" multiline value={ciudad.descripcion ?? ""} onChange={onChange} required />
                            </label>
                            <br />

                            <Typography align="center">
                                <label >
                                    Ranking:
                                    <Form.Select name="ranking" value={ciudad.ranking ?? ""} onChange={onChange} required>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Form.Select>
                                </label>
                                
                            </Typography>
                            <label>
                                <TextField type="text" id='text' label="Ambiente" name="ambiente" value={ciudad.ambiente ?? ""} onChange={onChange} required />
                            </label>
                            <br />

                            <div className="arrayContainer">
                                <label className="arraysInput">

                                    <TextField type="text" label="Lugares de Interes" name="lugaresInteres" value={lugarInteresInput} onChange={(e) => setLugarInteresInput(e.target.value)} />
                                    <Button onClick={addLugarInteres} ><AddCircle /></Button>
                                </label>
                                <br />
                                {ciudad.lugaresInteres.map((lugarInteres, index) => (
                                    <>
                                        <span>{lugarInteres}</span>
                                        <button onClick={() => deleteLugarInteres(index)} type="button">Delete</button>
                                    </>
                                ))}
                            </div>
                            <div className="arrayContainer">
                                <label className="arraysInput">
                                    <TextField type="text" label="URL de las Imagenes:" name="imagenes" value={imagenesInput} onChange={(e) => setImagenesInput(e.target.value)} />
                                    <Button onClick={addImagenes} ><AddCircle /></Button>
                                </label><br />
                                {ciudad.imagenes.map((imagenes, index) => (
                                    <>
                                        <span>{imagenes}</span>
                                        <button onClick={() => deleteImagenes(index)} type="button">Delete</button>
                                    </>
                                ))}
                            </div>
                            <Grid container justifyContent="center" spacing={1}>
                                <Grid item>

                                    <Button onClick={handleSubmit} >Guardar</Button>
                                </Grid><Grid item>
                                    <Button className="BotonesNormales" variant="contained" onClick={() => navigate(`/dashboardCiudades`)}>Volver</Button>
                                </Grid></Grid></form>
                    </CardContent>
                </Card>
            </Grid>
        </div></>
    )
}



export default DashboardCreateCiudades;