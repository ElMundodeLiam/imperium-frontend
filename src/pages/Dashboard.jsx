// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://imperium-backend-bpkr.onrender.com/api/user/datos", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUsuario(res.data))
      .catch(err => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!usuario) {
    return (
      <div className="text-white text-center mt-10">
        Cargando datos del usuario...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex text-white bg-gradient-to-br from-black to-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">🎰 Imperium</h2>
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded">
          Recargar
        </button>
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded">
          Retirar
        </button>
        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded">
          Historial
        </button>
        <button
          onClick={cerrarSesion}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 p-8">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">
            Bienvenido, {usuario.nombre}
          </h1>
          <p className="text-xl">💰 Saldo actual: ${usuario.saldo.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
