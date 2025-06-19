import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAutenticado(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Si hay token, va directo a dashboard; si no, primero a registro */}
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
          element={autenticado ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* Agrega más rutas cuando hagamos juegos, apuestas, etc */}
      </Routes>
    </Router>
  );
}

export default App;
