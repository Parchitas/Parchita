import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { queryCiudad, updateCiudad } from "../services/ciudades"

function DashboardEditCiudadPage() {
    const navigate = useNavigate()
    const { ciudadID } = useParams();
    const [ciudad, setCiudad] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const [lugarInteresInput, setLugarInteresInput] = React.useState("");
    const [imagenesInput, setImagenesInput] = React.useState("");
    React.useEffect(() => {

        setLoading(true)
        queryCiudad(ciudadID).then((response) => {
            setCiudad(response)
            setLoading(false)
        })

    }, [])

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

    function onChange(e) {
        const formName = e.target.name;
        const formValue = e.target.value;

        setCiudad(prevCiudad => ({ ...prevCiudad, [formName]: formValue }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        updateCiudad(ciudad, ciudadID).then(() => {
            navigate("/dashboardCiudades");
        }).catch(e => console.error({ error: e, msg: "ta malardo" }));
    }

    if (loading) return (
        <div> cargando </div>
    )

    return (
        <form onSubmit={handleSubmit}>
            <label >
                Nombre:
                <input type="text" id='nombre' name="nombre" value={ciudad.nombre ?? ""} onChange={onChange} required />
            </label>

            <label >
                Descripcion:
                <textarea name="descripcion" value={ciudad.descripcion ?? ""} onChange={onChange} required />
            </label>

            <label >
                Ranking:
                <select name="ranking" value={ciudad.ranking ?? ""} onChange={onChange} required>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </label>

            <label >
                Ambiente:
                <input type="text" id='text' name="ambiente" value={ciudad.ambiente ?? ""} onChange={onChange} required />
            </label>

            <div className="arrayContainer">
                <label className="arraysInput">
                    <span>Lugares de Interes: </span>
                    <input type="text" name="lugaresInteres" value={lugarInteresInput} onChange={(e) => setLugarInteresInput(e.target.value)} />
                    <button onClick={addLugarInteres} type="button">Add</button>
                </label>
                {ciudad.lugaresInteres.map((lugarInteres, index) => (
                    <>
                        <span>{lugarInteres}</span>
                        <button onClick={() => deleteLugarInteres(index)} type="button">Delete</button>
                    </>
                ))}
            </div>
            <div className="arrayContainer">
                <label className="arraysInput">
                    <span>URL de las Imagenes: </span>
                    <input type="text" name="imagenes" value={imagenesInput} onChange={(e) => setImagenesInput(e.target.value)} />
                    <button onClick={addImagenes} type="button">Add</button>
                </label>
                {ciudad.imagenes.map((imagenes, index) => (
                    <>
                        <span>{imagenes}</span>
                        <button onClick={() => deleteImagenes(index)} type="button">Delete</button>
                    </>
                ))}
            </div>

            <button>Editar</button>

            <div>Porsia te equivocaste de Ciudad</div>
            <button className="BotonesNormales" onClick={() => navigate(`/dashboardCiudades`)}>Regreso al DashboardHoteles</button>
        </form>
    )
}

export default DashboardEditCiudadPage; 