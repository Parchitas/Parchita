import React from "react";
import {makeStyles, Card, CardActions, CardContent, Button, Box, TextField, Divider} from "@material-ui/core"
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { sessionContext } from '../../context/SessionContext';

const Login = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const classes = useStyle()
  const {session, login, isLoading} = React.useContext(sessionContext)
  const fromPrivateRoute = searchParams.get("fromPrivateRoute")
  const location = useLocation()
  console.log(location)

  const submitHandler = (e) => {

    e.preventDefault()
    
    //@Kevin este beta no esta furulando, no deja que compile el proyecto, al final del corchete te pongo el codigo de error
    //const from = location.state?.from?.pathname || "/";
    const [email, password] = e.target

    login(email.value,password.value).then(() => {
      //navigate(from)
    })

  }
    /* Error que suelta al compilar: 
    El beta es q creí que era yo, y cuando lo cloné desde una computadora nueva todo de 0, instalando todo de 0, le pasaba exactamente lo mismo.

    Failed to compile.

      ./src/components/Login/Login.js 32:30
      Module parse failed: Unexpected token (32:30)
      You may need an appropriate loader to handle this file type.
      |     e.preventDefault(); //@Kevin este beta no esta furulando, no deja que compile el proyecto, al final del corchete te pongo el codigo de error
      |
      >     var from = location.state?.from?.pathname || "/";
      |
      |     var _e$target = _slicedToArray(e.target, 2),


    */

  
  // const handleGoogleLogin = async () => {
  //   const response = await signInWithPopup(auth, googleProvider);
  //   sessionCheck(response)
  // };
  // const handleFacebookLogin = async () => {
  //   const response = await signInWithPopup(auth, facebookProvider);
  //   sessionCheck(response)
  // };
  // const handleTwitterLogin = async () => {
  //   const response = await signInWithPopup(auth, twitterProvider);
  //   sessionCheck(response)
  // };
  // const handleGithubLogin = async () => {
  //   const response = await signInWithPopup(auth, githubProvider);
  //   sessionCheck(response)
  // };
  
  return (
    <div>
      {fromPrivateRoute ? <h1>Por favor, inicia sesion para seguir navegando</h1> : null}
      {isLoading ? <h1>Cargando...</h1> : null}
      <br/><div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card>
        <CardContent>
      <form onSubmit={submitHandler}>
              <div>
              <TextField id="email" type="email" label="Correo" variant="standard" />
              <br/>
              <TextField id="password" label="Contraseña" type="password" autoComplete="current-password" variant="standard" />
              </div>
            <CardActions>
              <Button
                type="submit"
                >Iniciar Sesion</Button>
                <Button onClick={()=> navigate("/register")}>Registrate aqui</Button>
                  </CardActions>
                  </form>
        </CardContent>
        </Card>
        {/* <button className={styles.submits} type="button" onClick={handleGoogleLogin}>
          <img className={styles.iconPic} src =" "></img>
        </button>     
        <button className={styles.submits} type="button" onClick={handleFacebookLogin}>
          <img className={styles.iconPic} src =" "></img>
        </button>     
        <button className={styles.submits} type="button" onClick={handleTwitterLogin}>
          <img className={styles.iconPic} src =" "></img>
        </button>     
        <button className={styles.submits} type="button" onClick={handleGithubLogin}>
          <img className={styles.iconPic} src =" "></img>
        </button>      */}
          
      
    </div></div>
  )

}

const useStyle=makeStyles((theme)=>({
}))


export default Login;
