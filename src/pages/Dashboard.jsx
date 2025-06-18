import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener token del localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch("https://imperium-backend-bpkr.onrender.com/api/user/datos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUsuario(data);
        } else {
          console.log("Error de respuesta:", data);
          navigate("/");
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      obtenerDatos();
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="text-white text-center text-xl mt-10">Cargando datos del usuario...</div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6">
        <h2 className="text-2xl font-bold mb-6">IMPERIUM CASINO</h2>
        <button
          onClick={() => alert("Función de recarga aún no implementada")}
          className="block w-full text-left mb-4 text-yellow-400 hover:underline"
        >
          💰 Recargar
        </button>
        <button
          onClick={() => alert("Función de retiro aún no implementada")}
          className="block w-full text-left mb-4 text-yellow-400 hover:underline"
        >
          🏧 Retirar
        </button>
        <button
          onClick={() => alert("Función de historial aún no implementada")}
          className="block w-full text-left mb-4 text-yellow-400 hover:underline"
        >
          📜 Historial
        </button>
        <button
          onClick={cerrarSesion}
          className="block w-full text-left mt-8 text-red-500 hover:underline"
        >
          🚪 Cerrar sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Bienvenido, {usuario?.nombre}</h1>
        <p className="text-xl">💸 Saldo actual: <span className="text-green-400">S/ {usuario?.saldo?.toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default Dashboard;
