// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tragamonedas from "./pages/Tragamonedas";
import ApuestasFutbol from "./pages/ApuestasFutbol";
import Ruleta from "./pages/Ruleta";
import JuegosFuturos from "./pages/JuegosFuturos";

function RutasProtegidas() {
  const { autenticado } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={autenticado ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/login" element={autenticado ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={autenticado ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/tragamonedas" element={autenticado ? <Tragamonedas /> : <Navigate to="/" />} />
      <Route path="/apuestas-futbol" element={autenticado ? <ApuestasFutbol /> : <Navigate to="/" />} />
      <Route path="/ruleta" element={autenticado ? <Ruleta /> : <Navigate to="/" />} />
      <Route path="/juegos-futuros" element={autenticado ? <JuegosFuturos /> : <Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <RutasProtegidas />
      </Router>
    </AuthProvider>
  );
}

export default App;
