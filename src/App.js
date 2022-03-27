//React
import React, { useContext } from 'react';
//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//Pages
import SearchPage from './pages/SearchPage';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import CiudadDetalles from './components/CiudadDetalles/CiudadDetalles';
import HotelDetalles from './components/HotelDetalles/HotelDetalles';
import CiudadesPage from './pages/CiudadesPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ReservaPage from './pages/ReservaPage';
import PerfilUsuarioPage from './pages/PerfilUsuarioPage';
import {sessionContext} from "../src/context/SessionContext"


function App() {

  const { isLoggedIn, isAdmin } = useContext(sessionContext)
  

  return (
    <BrowserRouter>

      <Navbar/>

      <Routes>

        <Route index element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/ciudades" element={<CiudadesPage/>} />
        <Route
          path="/reservar"
          element={
            <PrivateRoute isAllowed={isLoggedIn}>
              <ReservaPage/>
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute isAllowed={isLoggedIn}>
              <PerfilUsuarioPage/>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAllowed={isAdmin}>
              <DashboardPage/>
            </PrivateRoute>
          }
        />
        <Route path="/ciudades/:ciudadID" element={<CiudadDetalles/>}/>
        <Route path="/ciudades/:ciudadID/hoteles/:hotelID" element={<HotelDetalles/>}/>
        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
