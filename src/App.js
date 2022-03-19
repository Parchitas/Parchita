//React
import React from 'react';
//Pages
import SearchPage from './pages/SearchPage';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import CiudadDetalles from './components/CiudadDetalles/CiudadDetalles';
import HotelDetalles from './components/HotelDetalles/HotelDetalles';
import CiudadesPage from './pages/CiudadesPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './components/NotFound/NotFound';

function App() {

  return (
    <BrowserRouter>

      <Navbar/>

      <Routes>

        <Route index element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/ciudades" element={<CiudadesPage/>} />
        <Route path="/ciudades/:ciudadID" element={<CiudadDetalles/>}/>
        <Route path="/ciudades/:ciudadID/hoteles/:hotelID" element={<HotelDetalles/>}/>
        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
