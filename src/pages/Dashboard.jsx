import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsuario(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
        navigate("/login");
      });
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">🎰 Imperium</h2>
        <button
          onClick={() => alert("Función Recargar")}
          className="w-full text-left text-yellow-400 hover:underline"
        >
          💰 Recargar
        </button>
        <button
          onClick={() => alert("Función Retirar")}
          className="w-full text-left text-yellow-400 hover:underline"
        >
          🏧 Retirar
        </button>
        <button
          onClick={() => alert("Función Historial")}
          className="w-full text-left text-yellow-400 hover:underline"
        >
          📜 Historial
        </button>
        <button
          onClick={cerrarSesion}
          className="w-full text-left text-red-400 hover:underline"
        >
          🔓 Cerrar sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        {usuario ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">Bienvenido, {usuario.nombre}</h1>
            <p className="text-xl">
              💰 Tu saldo actual:{" "}
              <span className="text-green-400">S/ {usuario.saldo.toFixed(2)}</span>
            </p>
          </div>
        ) : (
          <p className="text-yellow-400">Cargando datos del usuario...</p>
        )}
      </div>
    </div>
  );
}
