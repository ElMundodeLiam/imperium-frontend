import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No hay sesión activa. Inicia sesión.");
          return;
        }

        const res = await axios.get("https://imperium-backend-bpkr.onrender.com/api/user/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsuario(res.data);
      } catch (err) {
        setError("Error al cargar los datos del usuario");
      }
    };

    fetchUsuario();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {usuario.nombre}</h1>
      <p className="text-xl">Saldo actual: ${usuario.saldo.toFixed(2)}</p>
      {/* Aquí puedes agregar botones de Recargar, Retirar, Apostar, etc */}
    </div>
  );
};

export default Dashboard;
