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
  const [autenticado, setAutenticado] = useState(false);

  // Esta parte verifica el token al inicio
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAutenticado(!!token);
  }, []);

  // Esta parte vuelve a verificar si cambia el token
  useEffect(() => {
    const verificarToken = () => {
      const token = localStorage.getItem("token");
      setAutenticado(!!token);
    };

    window.addEventListener("storage", verificarToken);
    return () => {
      window.removeEventListener("storage", verificarToken);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={autenticado ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/login" element={autenticado ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={autenticado ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/tragamonedas" element={autenticado ? <Tragamonedas /> : <Navigate to="/" />} />
        <Route path="/apuestas-futbol" element={autenticado ? <ApuestasFutbol /> : <Navigate to="/" />} />
        <Route path="/ruleta" element={autenticado ? <Ruleta /> : <Navigate to="/" />} />
        <Route path="/juegos-futuros" element={autenticado ? <JuegosFuturos /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
