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
      .get("https://imperium-backend.onrender.com/api/usuario/datos", {
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
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">🎰 Imperium Casino 🎰</h1>
        {usuario ? (
          <>
            <p className="text-xl mb-2">Bienvenido, <strong>{usuario.nombre}</strong></p>
            <p className="text-lg mb-6">Saldo: ${usuario.saldo}</p>
            <button
              onClick={cerrarSesion}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <p className="text-white">Cargando...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
