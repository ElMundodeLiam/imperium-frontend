// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://imperium-backend-bpkr.onrender.com/api/usuario/datos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsuario(res.data))
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">🎰 Imperium</h2>
        <button className="w-full bg-yellow-500 text-black py-2 px-4 rounded">
          Recargar
        </button>
        <button className="w-full bg-yellow-500 text-black py-2 px-4 rounded">
          Retirar
        </button>
        <button className="w-full bg-yellow-500 text-black py-2 px-4 rounded">
          Historial
        </button>
        <button
          onClick={cerrarSesion}
          className="w-full bg-red-600 text-white py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div class
