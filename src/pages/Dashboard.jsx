import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("https://imperium-backend-bpkr.onrender.com/api/usuario/datos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Token inválido o expirado");
        }

        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        setError(true);
        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (cargando) return <div className="text-white p-4">Cargando datos del usuario...</div>;

  if (error) return <div className="text-red-500 p-4">⚠️ Token inválido. Redirigiendo a login...</div>;

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="w-64 bg-gray-900 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">🎰 Imperium Casino</h1>
          <ul className="space-y-4">
            <li><button className="w-full text-left hover:text-yellow-400">💰 Recargar</button></li>
            <li><button className="w-full text-left hover:text-yellow-400">🏧 Retirar</button></li>
            <li><button className="w-full text-left hover:text-yellow-400">📜 Historial</button></li>
          </ul>
        </div>
        <button onClick={cerrarSesion} className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Cerrar sesión
        </button>
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Bienvenido, {usuario.nombre} 👋</h2>
        <p className="text-xl">💰 Saldo actual: <span className="text-yellow-400">${usuario.saldo.toFixed(2)}</span></p>
      </div>
    </div>
  );
}
