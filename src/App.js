import React from 'react';
import HeaderAdmin from './components/Admin/HeaderAdmin';
import HeaderVisitante from './components/Visitante/HeaderVisitante';
import HeaderUsuario from './components/Usuario/HeaderUsuario';
import Home from './components/General/Home';
import NotFound from './components/General/Home';
import Login from "./components/Logueo/Login"
import DashBoard from "./components/Admin/DashBoard"
import LoginOrHome from "./components/Intermedios/LoginOrHome"
import SearchPage from './components/General/SearchPage';
import {
  BrowserRouter,
  Route, 
  Routes } from "react-router-dom"
import {useState} from "react"
import firebaseApp from './firebase/credenciales';
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {getFirestore,doc,getDoc} from "firebase/firestore"
const auth= getAuth(firebaseApp)
const firestore= getFirestore(firebaseApp)

function App() {
  const [user, setUser]=useState(null)

  async function getRol(uid){
    const docuRef=doc(firestore,`usuarios/${uid}`)
    const docuCifrada= await getDoc(docuRef)
    const infoFinal = docuCifrada.data().rol
    return infoFinal


  }
   function setUserWithFirebaseRol(usuarioFirebase){
    getRol(usuarioFirebase.uid).then(
      (rol)=>{
        const userData={
          uid:usuarioFirebase.uid,
          email:usuarioFirebase.email,
          rol:rol,
       
        };
        setUser(userData);
      }
    );
   }
  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if(usuarioFirebase){
      
      if (!user){
        setUserWithFirebaseRol(usuarioFirebase)
      }
      
    }else{
      setUser(null);
    }
  });
  
  function headersDataValor(){
    
    if(!user){
      return <HeaderVisitante/>
    }else if(user.rol="usuario"){
      return <HeaderAdmin/>

    }else if(user.rol="admin"){
      return <HeaderUsuario/>

    }
  }

 

  return (
    <BrowserRouter>
      
      {
        headersDataValor()

      }

      <Routes>
        <Route index element={<Home/>}/>
        <Route path = "/search" element = {<SearchPage />} />
      
        <Route path = "/login" element = { user ? <Home/>:<Login/> } /> 
        
        
        <Route path = "*" element = { <NotFound/>} />
        
      </Routes>
        
      
    </BrowserRouter>
  );
}

export default App;
