import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mostrarSidebar, setMostrarSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const respuesta = await fetch("https://imperium-backend-bpkr.onrender.com/api/usuario/datos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!respuesta.ok) {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const datos = await respuesta.json();
        setUsuario(datos);
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    obtenerDatos();
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-black text-white relative">
      {/* Botón menú móvil */}
      <button
        onClick={() => setMostrarSidebar(!mostrarSidebar)}
        className="md:hidden absolute top-4 left-4 z-30 text-white text-3xl"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-900 p-6 flex flex-col justify-between transition-all duration-300 fixed md:relative z-20 h-full w-64 ${
          mostrarSidebar ? "left-0" : "-left-64"
        } md:left-0`}
      >
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
              <button onClick={() => navigate("/tragamonedas")} className="w-full text-left hover:text-yellow-400">
                🎰 Tragamonedas
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/apuestas-futbol")} className="w-full text-left hover:text-yellow-400">
                ⚽ Apuestas de Fútbol
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/ruleta")} className="w-full text-left hover:text-yellow-400">
                🎡 Ruleta
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/juegos-futuros")} className="w-full text-left hover:text-yellow-400">
                🧩 Juegos Futuros
              </button>
            </li>
          </ul>
        </div>
        <button
          onClick={cerrarSesion}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-6 md:ml-64">
        {cargando ? (
          <h2 className="text-xl">Cargando datos del usuario...</h2>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Bienvenido, {usuario.name || usuario.nombre} 👋</h2>
            <p className="text-xl">
              💰 Saldo actual:{" "}
              <span className="text-yellow-400">${usuario.balance?.toFixed(2) || "0.00"}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
