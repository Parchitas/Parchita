import React from 'react'
import {makeStyles} from "@material-ui/core"
import {useState} from "react"
import firebaseApp from "../../firebase/credenciales"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth"
import {getFirestore, doc, setDoc} from "firebase/firestore"

const auth=getAuth(firebaseApp)




const Login = () => {
  const firestore= getFirestore(firebaseApp)
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


    const docuRef =  doc(firestore,`usuarios/${infoUsuario.user.uid}`)
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
