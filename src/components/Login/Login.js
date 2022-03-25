import React from "react";
import {makeStyles} from "@material-ui/core"
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { sessionContext } from '../../context/SessionContext';

const Login = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const classes = useStyle()
  const {session, login, isLoading} = React.useContext(sessionContext)
  const fromPrivateRoute = searchParams.get("fromPrivateRoute")
  const location = useLocation()
  const submitHandler = (e) => {

    e.preventDefault()
    console.log(location)
    const from = (location.state ? location.state.from.pathname :  "/");
    const [email, password] = e.target
    login(email.value,password.value).then(() => {
    navigate(from)
    })
   
  }
  
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
      <form onSubmit={submitHandler}>
        <label>
          Correo Electronico: 
          <input type="email" id='email'/>
        </label>
        <label>
          Contraseña: 
          <input type="password" id='password'/>
          <input
            type="submit"
            value={ "Iniciar Sesión"}
          />
        </label>
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
      </form>
      <button onClick={()=> navigate("/register")}>Registrate aqui</button>
    </div>
  )
}

const useStyle=makeStyles((theme)=>({
}))


export default Login;
