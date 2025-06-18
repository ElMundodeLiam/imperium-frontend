import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const obtenerDatos = async () => {
      try {
        const res = await fetch("https://imperium-backend-bpkr.onrender.com/api/usuario/datos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const data = await res.json();
        setUsuario(data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        navigate("/");
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">🎰 Imperium Casino</h1>
          <ul className="space-y-4">
            <li><button className="hover:text-yellow-400">💰 Recargar</button></li>
            <li><button className="hover:text-yellow-400">🏧 Retirar</button></li>
            <li><button className="hover:text-yellow-400">📜 Historial</button></li>
          </ul>
        </div>
        <button
          onClick={cerrarSesion}
          className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        {cargando ? (
          <p className="text-xl">Cargando datos del usuario...</p>
        ) : usuario ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Bienvenido, {usuario.nombre} 👋</h2>
            <p className="text-xl">
              💰 Saldo actual: <span className="text-yellow-400">${usuario.saldo.toFixed(2)}</span>
            </p>
          </div>
        ) : (
          <p className="text-red-500">No se pudieron cargar los datos del usuario.</p>
        )}
      </div>
    </div>
  );
}
