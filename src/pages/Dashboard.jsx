// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch("https://imperium-backend-bpkr.onrender.com/api/usuario/datos", {
      headers: {
        "x-auth-token": token,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.nombre) {
          setUsuario(data);
        } else {
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"));
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!usuario) return <div className="text-white">Cargando...</div>;

  return (
    <div className="text-white min-h-screen bg-black p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenido {usuario.nombre}</h1>
      <p className="text-xl mb-6">Saldo actual: <span className="font-semibold">${usuario.saldo}</span></p>
      <button
        onClick={cerrarSesion}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;
