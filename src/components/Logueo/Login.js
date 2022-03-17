import React from 'react'
import {makeStyles, Card, CardActions, CardContent, Button, Box, TextField, Divider} from "@material-ui/core"
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
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      
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
              >{isRegistrando ? "Registrar" : "Iniciar Sesión"}</Button>
              <div><Button placement="bottom" onClick={() => setIsRegistrando(!isRegistrando)}>
                {isRegistrando ? "Ya Tengo Una Cuenta" : "Quiero Registrarme"}
              </Button></div>
            </CardActions>
          </form>
        </CardContent>
      </Card>
  
      </div></>
  )

}

const useStyle=makeStyles((theme)=>({
}))


export default Login
