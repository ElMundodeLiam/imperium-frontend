import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAutenticado(false);
        setVerificando(false);
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
      }

      setVerificando(false);
    };

    verificarToken();
  }, []);

  if (verificando) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={autenticado ? <Dashboard /> : <Register />} />
        <Route path="/tragamonedas" element={autenticado ? <Tragamonedas /> : <Register />} />
        <Route path="/apuestas-futbol" element={autenticado ? <ApuestasFutbol /> : <Register />} />
        <Route path="/ruleta" element={autenticado ? <Ruleta /> : <Register />} />
        <Route path="/juegos-futuros" element={autenticado ? <JuegosFuturos /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
