import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard({ onLogout }) {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const [mostrarSidebar, setMostrarSidebar] = useState(false);

  const toggleSidebar = () => setMostrarSidebar(!mostrarSidebar);

  const cerrarSesion = () => {
    onLogout();
    navigate("/");
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://imperium-backend-bpkr.onrender.com/api/user/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Botón hamburguesa */}
      <button onClick={toggleSidebar} className="absolute top-4 left-4 z-30 md:hidden">
        <span className="text-3xl">☰</span>
      </button>

      {/* Sidebar */}
      <div className={`bg-gray-900 p-6 flex flex-col justify-between transition-all duration-300 fixed md:relative z-20 h-full md:w-64 w-64 ${mostrarSidebar ? "left-0" : "-left-64"} md:left-0`}>
        <div>
          <h1 className="text-2xl font-bold mb-6">🎰 Imperium Casino</h1>
          <ul className="space-y-4">
            <li><button className="w-full text-left hover:text-yellow-400">💰 Recargar</button></li>
            <li><button className="w-full text-left hover:text-yellow-400">🏧 Retirar</button></li>
            <li><button className="w-full text-left hover:text-yellow-400">📜 Historial</button></li>
            <li><button onClick={() => navigate("/tragamonedas")} className="w-full text-left hover:text-yellow-400">🎰 Tragamonedas</button></li>
            <li><button onClick={() => navigate("/apuestas-futbol")} className="w-full text-left hover:text-yellow-400">⚽ Apuestas de Fútbol</button></li>
            <li><button onClick={() => navigate("/ruleta")} className="w-full text-left hover:text-yellow-400">🎡 Ruleta</button></li>
            <li><button onClick={() => navigate("/juegos-futuros")} className="w-full text-left hover:text-yellow-400">🧩 Juegos Futuros</button></li>
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
      <div className="flex-1 p-8 ml-0 md:ml-64">
        <h2 className="text-3xl font-bold mb-4">Bienvenido, 👋 {usuario?.name || ""}</h2>
        <p className="text-yellow-400 text-xl">💰 Saldo actual: ${usuario?.balance?.toFixed(2) || "0.00"}</p>
      </div>
    </div>
  );
}

export default Dashboard;
