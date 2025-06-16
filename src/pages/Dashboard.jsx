import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("https://imperium-backend.onrender.com/api/usuario/datos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsuario(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
        setError("Error al obtener datos del usuario");
        navigate("/");
      });
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">🎰 Imperium Casino 🎰</h1>

        {error && <p className="text-red-400">{error}</p>}

        {usuario ? (
          <>
            <p className="text-xl mb-2">Hola, {usuario.nombre} 👋</p>
            <p className="text-lg mb-4">Saldo actual: ${usuario.saldo}</p>
            <button
              onClick={cerrarSesion}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
