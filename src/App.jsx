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
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Validar token con backend
      fetch("https://imperium-backend-bpkr.onrender.com/api/usuario/datos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            setAutenticado(true);
          } else {
            localStorage.removeItem("token");
            setAutenticado(false);
          }
        })
        .catch(() => {
          setAutenticado(false);
        });
    } else {
      setAutenticado(false);
    }
  }, []);

  if (autenticado === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={autenticado ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/login"
          element={autenticado ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={autenticado ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/tragamonedas"
          element={autenticado ? <Tragamonedas /> : <Navigate to="/" />}
        />
        <Route
          path="/apuestas-futbol"
          element={autenticado ? <ApuestasFutbol /> : <Navigate to="/" />}
        />
        <Route
          path="/ruleta"
          element={autenticado ? <Ruleta /> : <Navigate to="/" />}
        />
        <Route
          path="/juegos-futuros"
          element={autenticado ? <JuegosFuturos /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
