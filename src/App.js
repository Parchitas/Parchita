//React
import React, { useContext } from 'react';
//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//Pages
import SearchPage from './pages/SearchPage';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CiudadDetalles from './components/CiudadDetalles/CiudadDetalles';
import HotelDetalles from './components/HotelDetalles/HotelDetalles';
import CiudadesPage from './pages/CiudadesPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DashboardCiudadesPage from './pages/DashboardCiudadesPage';
import DashboardEditCiudadPage from './pages/DashboardEditCiudadPage';
import DashboardCreateCiudadesPage from './pages/DashboardCreateCiudadesPage';
import DashboardCreateHotelesPage from './pages/DashboardCreateHotelesPage';
import DashboardCreateHabPage from './pages/DashboardCreateHabPage';
import DashboardEditHotelPage from './pages/DashboardEditHotelPage';
import DashboardHotelesPage from './pages/DashboardHotelesPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ReservaPage from './pages/ReservaPage';
import PerfilUsuarioPage from './pages/PerfilUsuarioPage';
import { sessionContext } from "../src/context/SessionContext"
import PagoPage from "./pages/PagoPage"


function App() {

  const { isLoggedIn, isAdmin } = useContext(sessionContext)


  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route index element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ciudades" element={<CiudadesPage />} />
        <Route path="/pago" element={<PagoPage />} />
        <Route path="/ciudades?search=" element={<CiudadesPage />} />
        <Route
          path="/reservar"
          element={
            <PrivateRoute isAllowed={isLoggedIn}>
              <ReservaPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute isAllowed={isLoggedIn}>
              <PerfilUsuarioPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAllowed={isAdmin}>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route path="/dashboardHoteles" element={
          <PrivateRoute isAllowed={isAdmin}>
            <DashboardHotelesPage />
          </PrivateRoute>
        } />

        <Route path="/dashboardHoteles/:hotelID" element={
          <PrivateRoute isAllowed={isAdmin}>
            <DashboardEditHotelPage/>
          </PrivateRoute>
        } />

        <Route path="/dashboardCiudades" element={
          <PrivateRoute isAllowed={isAdmin}>
            <DashboardCiudadesPage />
          </PrivateRoute>
        } />

        <Route path="/dashboardCiudades/create" element={
          <PrivateRoute isAllowed={isAdmin}>
            <DashboardCreateCiudadesPage />
          </PrivateRoute>
        } />
        <Route path="/dashboardHoteles/create" element={
          <PrivateRoute isAllowed={isAdmin}>
            <DashboardCreateHotelesPage />
          </PrivateRoute>
        } />

        <Route path="/dashboardHabitaciones" element={
          <PrivateRoute isAllowed={isAdmin}>
            <DashboardCreateHabPage />
          </PrivateRoute>
        } />

        <Route path="/dashboardCiudades/:ciudadID" element={
          <PrivateRoute isAllowed={isAdmin}>
            <DashboardEditCiudadPage />
          </PrivateRoute>
        } />


        <Route path="/ciudades/:ciudadID" element={<CiudadDetalles />} />
        <Route path="/ciudades/:ciudadID/hoteles/:hotelID" element={<HotelDetalles />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
