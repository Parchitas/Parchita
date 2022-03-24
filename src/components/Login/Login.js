import React from "react";
import {makeStyles} from "@material-ui/core"
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { sessionContext } from '../../context/SessionContext';
import "../../css/Login.css"

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
    // const from = location.state?.from?.pathname || "/";
    const from = "/";

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
   

      
      <div className="pagina">
        <div id="contenedor">
          <div id="conte">
            <div id="sigIn">
              <h1>Sig in</h1>
            </div>
          
            <div className="Formulario">
              {fromPrivateRoute ? <h1>Por favor, inicia sesion para seguir navegando</h1> : null}
              {isLoading ? <h1>Cargando...</h1> : null}
              <form onSubmit={submitHandler} id="login">
                <div>
                  <label >
                    Correo Electronico: 
                    <input type="email" id='email'/>
                  </label>
                </div>
                <label>
                  Contraseña: 
                  <input type="password" id='password'/>
                  
                  <input className="iniciar"
                    type="submit"
                    value={ "Iniciar Sesión"}
                  />
                </label>
                <div className="modosDeInicio">

                  <div className="cBoton">
                    <button className="boton">
                        <svg  xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </button>
                  </div>

                  <div className="cBoton">
                    <button className="boton">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="auto" height="auto">
                          <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#2aa4f4"/>
                            <stop offset="1" stop-color="#007ad9"/>
                          </linearGradient>
                          <path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"/>
                          <path fill="#FFFF" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"/>
                        </svg>

                    </button>
                  </div>

                  <div className="cBoton">
                    <button className="boton">
                      
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="auto" height="auto">
                          <linearGradient id="MJy9k6AlNL0BTsRkEkukAa" x1="8.455" x2="40.88" y1="7.883" y2="41.5" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#2aa4f4"/>
                            <stop offset="1" stop-color="#007ad9"/>
                          </linearGradient><path fill="url(#MJy9k6AlNL0BTsRkEkukAa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"/>
                          <path d="M20,35c-3.24,0-6.351-0.794-8.535-2.178l-0.337-0.213l0.592-1.671l0.396,0.046	c0.149,0.018,0.266,0.021,0.385,0.021L12.995,31c0.997,0,2.452-0.16,3.846-0.577c-1.396-0.476-3.166-1.401-3.72-3.115L12.697,26	h1.027C12.625,24.997,12,23.602,12,22.057v-1.62l0.609,0.281c-0.395-0.765-0.604-1.537-0.604-2.262c0-1.049,0.278-2.075,0.806-2.966	l0.729-1.228l0.906,1.102c1.997,2.431,5.244,5.096,8.554,5.563V20c0-3.364,2.468-6,5.617-6c1.545,0,2.883,0.442,3.888,1.281	c1.039-0.261,2.308-0.743,2.989-1.144l2.264-1.332l-0.807,2.5c-0.038,0.12-0.086,0.24-0.144,0.362l1.939-0.859l-2.158,3.233	c-0.449,0.683-0.875,1.332-1.595,1.939C34.998,20.239,35,20.511,35,20.63C35,27.596,29.743,35,20,35z" opacity=".05"/>
                          <path d="M20,34.5c-3.147,0-6.161-0.766-8.268-2.101l0.325-0.919c0.172,0.02,0.306,0.025,0.442,0.025L13,31.5	c1.613,0,3.799-0.369,5.475-1.163c-2.026-0.377-4.306-1.415-4.878-3.184L13.385,26.5h0.688c0.476,0,0.855-0.025,1.165-0.065	c-1.703-0.855-2.737-2.454-2.737-4.378v-0.838l0.737,0.341c0.215,0.116,0.501,0.249,0.813,0.378c-0.88-1.01-1.545-2.255-1.545-3.481	c0-0.959,0.255-1.897,0.736-2.711l0.364-0.614l0.453,0.551c2.209,2.689,5.804,5.554,9.44,5.8V20c0-3.084,2.248-5.5,5.117-5.5	c1.529,0,2.819,0.458,3.751,1.328c1.124-0.252,2.585-0.792,3.379-1.259l1.132-0.666l-0.403,1.25	c-0.191,0.594-0.654,1.192-1.197,1.726c0.174-0.068,0.348-0.14,0.52-0.216l1.577-0.699l-1.202,1.801	c-0.483,0.736-0.906,1.38-1.683,1.981c0.006,0.303,0.01,0.727,0.01,0.883C34.5,27.354,29.418,34.5,20,34.5z" opacity=".07"/>
                          <path fill="#fff" d="M36,15c-0.951,0.559-2.671,1.156-3.793,1.372C31.311,15.422,30.033,15,28.617,15	C25.897,15,24,17.305,24,20v2c-4,0-7.9-3.047-10.327-6c-0.427,0.721-0.667,1.565-0.667,2.457c0,1.819,1.671,3.665,2.994,4.543	c-0.807-0.025-2.335-0.641-3-1v0.057c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27	c0.626,1.935,3.773,2.958,5.928,3c-1.686,1.307-4.692,2-7,2c-0.399,0-0.615,0.022-1-0.023C14.178,33.357,17.22,34,20,34	c9.057,0,14-6.918,14-13.37c0-0.212-0.007-0.922-0.018-1.13c0.968-0.682,1.36-1.396,2.018-2.38c-0.882,0.391-1.999,0.758-3,0.88	C34.018,17.396,35.633,16.138,36,15z"/>
                        </svg>
                      

                    </button>
                    
                  </div>
                  <div className="cBoton">
                    <button className="boton">
                      
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="auto" height="auto">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                    </svg>
                      

                    </button>
                    
                  </div>
                </div>
                
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
              
            
              <div id="contenedorRegistro">
                <button id ="botonRegistrarse" onClick={()=> navigate("/register")}> Registrarse</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  )
}

const useStyle=makeStyles((theme)=>({
}))


export default Login;
