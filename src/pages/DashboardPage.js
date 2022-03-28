//Pantalla para elegir a que dashboard el admin quiere ir si al de hoteHoteles de Hoteles
import React from "react";
import { useNavigate } from 'react-router-dom';


function DashboardPage(){
    
    const navigate = useNavigate()

    return(
        <div>
            <h1>Que quieres modificar</h1>
            <button onClick={()=> navigate("/dashboardCiudades")}>Ciudades</button>
            <button onClick={()=> navigate("/dashboardHoteles")}>Hoteles</button>
        </div>
    );

}

export default DashboardPage;