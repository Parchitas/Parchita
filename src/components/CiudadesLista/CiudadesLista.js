import React from 'react';
import Ciudad from "../Ciudad/Ciudad";
import info from "./CiudadesLista.json";
import { Grid } from '@material-ui/core';


function CiudadesLista({ ciudades }) {

    //const { ciudades } = info;
    //console.log(ciudades[0].ambiente)
      

      return (
 
            <Grid container spacing={0.5}>
                  {ciudades.map(ciudad => <Ciudad key={ciudad.id} ciudad={ciudad} />)}
            </Grid>

      )
}

export default CiudadesLista;