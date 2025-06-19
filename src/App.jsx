import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tragamonedas from "./pages/Tragamonedas";
import ApuestasFutbol from "./pages/ApuestasFutbol";
import Ruleta from "./pages/Ruleta";
import JuegosFuturos from "./pages/JuegosFuturos";

function App() {
  const [autenticado, setAutenticado] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const manejarCambioToken = () => {
      setAutenticado(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", manejarCambioToken);

    return () => {
      window.removeEventListener("storage", manejarCambioToken);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={autenticado ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/login" element={autenticado ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={autenticado ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/tragamonedas" element={autenticado ? <Tragamonedas /> : <Navigate to="/login" />} />
        <Route path="/apuestas-futbol" element={autenticado ? <ApuestasFutbol /> : <Navigate to="/login" />} />
        <Route path="/ruleta" element={autenticado ? <Ruleta /> : <Navigate to="/login" />} />
        <Route path="/juegos-futuros" element={autenticado ? <JuegosFuturos /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
