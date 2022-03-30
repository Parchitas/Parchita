import React from "react";
import { createCiudad } from "../services/ciudades"
import '../css/DashboardCreateCiudadesPage.css';
import { useNavigate } from "react-router-dom";

function DashboardCreateCiudades(){
    
    const [ciudad, setCiudad] = React.useState({ ranking: "0", lugaresInteres: [], imagenes: [] })
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
        setCiudad({ ...ciudad, lugaresInteres: ciudad.lugaresInteres.filter((lugarInteres, index) => idx !== index )})
    }       

    function addLugarInteres() {
        setCiudad({ ...ciudad, lugaresInteres: ciudad.lugaresInteres.concat(lugarInteresInput) })
        setLugarInteresInput("");
    }
    
    function deleteImagenes(idx) {
        setCiudad({ ...ciudad, imagenes: ciudad.imagenes.filter((lugarInteres, index) => idx !== index )})
    }       

    function addImagenes() {
        setCiudad({ ...ciudad, imagenes: ciudad.imagenes.concat(imagenesInput) })
        setImagenesInput("");
    }

    function handleSubmit(e){
        e.preventDefault();
        createCiudad(ciudad).then(() => {
            navigate("/dashboardCiudades")
        })
    }



    return (    

        <form onSubmit={handleSubmit}>
            <label > 
                Nombre:
                <input type="text" id='nombre' name ="nombre" value= {ciudad.nombre ?? ""} onChange={onChange} />
            </label>

            <label >
                Descripcion:
                <textarea name="descripcion" value= {ciudad.descripcion ?? ""} onChange={onChange} />
            </label>

            <label >
                Ranking:
                <select name="ranking" value= {ciudad.ranking ?? ""} onChange={onChange}>
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
                <input type="text" id='text' name="ambiente" value= {ciudad.ambiente ?? ""} onChange={onChange} />
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
                        <button onClick={() => deleteLugarInteres(index)} type= "button">Delete</button>
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
                        <button onClick={() => deleteImagenes(index)} type= "button">Delete</button>
                    </>
                ))}
            </div>

            <button>Submit</button>
        </form> 
    )
}



export default DashboardCreateCiudades;