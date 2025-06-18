import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [datosUsuario, setDatosUsuario] = useState(null);
  const navigate = useNavigate();

  const obtenerDatos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/");

      const respuesta = await fetch("https://imperium-backend-bpkr.onrender.com/api/usuario/datos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || "Error al obtener datos");
      }

      setDatosUsuario(datos);
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">🎰 Imperium Casino</h2>
        <button onClick={() => alert("Función Recargar")} className="block w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-yellow-500">
          Recargar
        </button>
        <button onClick={() => alert("Función Retirar")} className="block w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-yellow-500">
          Retirar
        </button>
        <button onClick={() => alert("Función Historial")} className="block w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-yellow-500">
          Historial
        </button>
        <button onClick={cerrarSesion} className="block w-full text-left px-4 py-2 bg-red-600 rounded hover:bg-red-700">
          Cerrar sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-8">
        {datosUsuario ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">Bienvenido, {datosUsuario.nombre}</h1>
            <p className="text-xl">💰 Saldo: S/ {datosUsuario.saldo}</p>
          </div>
        ) : (
          <p className="text-xl">Cargando datos del usuario...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
