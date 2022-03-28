import React from 'react';
import Ciudad from "../Ciudad/Ciudad";
import { Grid } from '@material-ui/core';


function CiudadesLista({ ciudades }) {


      return (

            <div style={{ display: 'flexbox', justifyContent: 'center' }}>
                  <Grid container justifyContent="center" spacing={1}>
                        {ciudades.map(ciudad => <Ciudad key={ciudad.id} ciudad={ciudad} />)}
                  </Grid>
            </div>

      )
}

export default CiudadesLista;