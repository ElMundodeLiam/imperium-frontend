import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

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
      </Routes>
    </Router>
  );
}

export default App;
