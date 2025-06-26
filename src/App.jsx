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
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAutenticado(false);
        setCargando(false);
        return;
      }

      try {
        const res = await fetch("https://imperium-backend-bpkr.onrender.com/api/usuario/datos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setAutenticado(true);
        } else {
          localStorage.removeItem("token");
          setAutenticado(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setAutenticado(false);
      } finally {
        setCargando(false);
      }
    };

    verificarToken();
  }, []);

  if (cargando) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={!autenticado ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!autenticado ? <Login /> : <Navigate to="/dashboard" />} />
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
