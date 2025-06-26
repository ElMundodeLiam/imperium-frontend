import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tragamonedas from "./pages/Tragamonedas";
import ApuestasFutbol from "./pages/ApuestasFutbol";
import Ruleta from "./pages/Ruleta";
import JuegosFuturos from "./pages/JuegosFuturos";

function App() {
  const [autenticado, setAutenticado] = useState(false);

  const manejarLogin = () => {
    setAutenticado(true);
  };

  const manejarLogout = () => {
    localStorage.removeItem("token");
    setAutenticado(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login onLogin={manejarLogin} />} />
        <Route path="/dashboard" element={autenticado ? <Dashboard onLogout={manejarLogout} /> : <Navigate to="/login" />} />
        <Route path="/tragamonedas" element={autenticado ? <Tragamonedas /> : <Navigate to="/login" />} />
        <Route path="/apuestas-futbol" element={autenticado ? <ApuestasFutbol /> : <Navigate to="/login" />} />
        <Route path="/ruleta" element={autenticado ? <Ruleta /> : <Navigate to="/login" />} />
        <Route path="/juegos-futuros" element={autenticado ? <JuegosFuturos /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
