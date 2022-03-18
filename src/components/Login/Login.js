import React from "react"
import {makeStyles} from "@material-ui/core"
import {useState} from "react"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {doc, setDoc} from "firebase/firestore"
import {auth, db, googleProvider, facebookProvider, twitterProvider, githubProvider} from "../../firebase/credenciales"

const Login = () => {
  const classes=useStyle()
  const [isRegistrando,setIsRegistrando]=useState(false)
  

  async function registrarUsuario(email,password){
    const infoUsuario= await createUserWithEmailAndPassword(
      auth,
      email,
      password
      ).then((usuarioFirebase)=>{
      return usuarioFirebase;
    });
    console.log(infoUsuario)


    const docuRef =  doc(db,`usuarios/${infoUsuario.user.uid}`)
    setDoc(docuRef, {correo:email,rol:"usuario"})

  } 
  function submitHandler(e){
    e.preventDefault();
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value;
    console.log(email,password)
    if(isRegistrando){
      registrarUsuario(email,password);
    }else{
      signInWithEmailAndPassword(auth,email,password)
    }

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
            value={isRegistrando ? "Registrar" : "Iniciar Sesión"}
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
      <button onClick={()=> setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "Ya Tengo Una Cuenta" : "Quiero Registrarme"}
      </button>


    </div>
    
  )

}

const useStyle=makeStyles((theme)=>({
}))


export default Login
