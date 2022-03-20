import React from "react";
import {makeStyles} from "@material-ui/core"
import { useNavigate } from 'react-router-dom';
import { sessionContext } from '../../context/SessionContext';
//Falta manejar esto por context

const Login = () => {

  const navigate = useNavigate()
  const classes=useStyle()
  const {session, login, isLoading} = React.useContext(sessionContext)

  const submitHandler = (e) => {
    e.preventDefault()
    const [email, password] = e.target
    login(email.value,password.value).then(() => {
      navigate("/")
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
