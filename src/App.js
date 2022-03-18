//React
import React from 'react';
import { useState } from "react"

//Pages
import HeaderAdmin from './components/Admin/HeaderAdmin';
import HeaderVisitante from './components/Visitante/HeaderVisitante';
import HeaderUsuario from './components/Usuario/HeaderUsuario';
import SearchPage from './pages/SearchPage';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import CiudadDetalles from './components/CiudadDetalles/CiudadDetalles';
import HotelDetalles from './components/HotelDetalles/HotelDetalles';
import CiudadesPage from './pages/CiudadesPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFound from './components/NotFound/NotFound';

//Esto lo quiero mover de aqui y que manejemos todo esto con context
import {auth, db} from './firebase/credenciales';
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"


function App() {
  
  const [user, setUser] = useState(null)
  async function getRol(uid) {
    const docuRef = doc(db, `usuarios/${uid}`)
    const docuCifrada = await getDoc(docuRef)
    const infoFinal = docuCifrada.data().rol
    return infoFinal


  }
  function setUserWithFirebaseRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then(
      (rol) => {
        const userData = {
          uid: usuarioFirebase.uid,
          email: usuarioFirebase.email,
          rol: rol,

        };
        setUser(userData);
      }
    );
  }
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {

      if (!user) {
        setUserWithFirebaseRol(usuarioFirebase)
      }

    } else {
      setUser(null);
    }
  });

  function headersDataValor() {

    if (!user) {
      return <HeaderVisitante />
    } else if (user.rol = "usuario") {
      return <HeaderAdmin />

    } else if (user.rol = "admin") {
      return <HeaderUsuario />

    }
  }



  return (
    <BrowserRouter>

      {
        headersDataValor()

      }

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={user ? <HomePage /> : <LoginPage />} />
        <Route path="/ciudades" element={<CiudadesPage/>} />
        <Route path="/ciudades/:ciudadID" element={<CiudadDetalles/>}/>
        <Route path="/ciudades/:ciudadID/hoteles/:hotelID" element={<HotelDetalles/>}/>
        <Route path="*" element={<NotFound />} />

      </Routes>


    </BrowserRouter>
  );
}

export default App;
