import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const { cerrarSesion } = useContext(AuthContext);

  useEffect(() => {
    const obtenerDatos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        cerrarSesion();
        return;
      }

      try {
        const respuesta = await fetch("https://imperium-backend-bpkr.onrender.com/api/usuario/datos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!respuesta.ok) {
          cerrarSesion();
          return;
        }

        const datos = await respuesta.json();
        setUsuario(datos);
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        cerrarSesion();
      }
    };

    obtenerDatos();
  }, [cerrarSesion]);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">🎰 Imperium Casino</h1>
          <ul className="space-y-4">
            <li>
              <button className="w-full text-left hover:text-yellow-400">💰 Recargar</button>
            </li>
            <li>
              <button className="w-full text-left hover:text-yellow-400">🏧 Retirar</button>
            </li>
            <li>
              <button className="w-full text-left hover:text-yellow-400">📜 Historial</button>
            </li>
            <li>
              <button onClick={() => navigate("/tragamonedas")} className="w-full text-left hover:text-yellow-400">🎰 Tragamonedas</button>
            </li>
            <li>
              <button onClick={() => navigate("/apuestas-futbol")} className="w-full text-left hover:text-yellow-400">⚽ Apuestas de Fútbol</button>
            </li>
            <li>
              <button onClick={() => navigate("/ruleta")} className="w-full text-left hover:text-yellow-400">🎡 Ruleta</button>
            </li>
            <li>
              <button onClick={() => navigate("/juegos-futuros")} className="w-full text-left hover:text-yellow-400">🧩 Juegos Futuros</button>
            </li>
          </ul>
        </div>
        <button onClick={cerrarSesion} className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Cerrar sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        {cargando ? (
          <h2 className="text-xl">Cargando datos del usuario...</h2>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Bienvenido, {usuario.name} 👋</h2>
            <p className="text-xl">
              💰 Saldo actual: <span className="text-yellow-400">${usuario.balance.toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
