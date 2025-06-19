import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tragamonedas from "./pages/Tragamonedas";
import ApuestasFutbol from "./pages/ApuestasFutbol";
import Ruleta from "./pages/Ruleta"; // ⬅️ Agrega esto arriba con los demás imports
import JuegosFuturos from "./pages/JuegosFuturos";
function App() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAutenticado(!!token);
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
