// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

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

  if (!usuario) return <div className="text-white">Cargando...</div>;

  return (
    <div className="text-white text-center p-6">
      <h1 className="text-3xl font-bold mb-4">¡Bienvenido {usuario.nombre}!</h1>
      <p className="text-xl">Tu saldo es: <strong>${usuario.saldo}</strong></p>
    </div>
  );
};

export default Dashboard;
