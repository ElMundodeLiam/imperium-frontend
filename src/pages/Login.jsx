import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("https://imperium-backend-bpkr.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, password }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setMensaje(datos.mensaje || "Error al iniciar sesión");
        return;
      }

      // Guardar token y redirigir
      localStorage.setItem("token", datos.token);
      console.log("✅ Token guardado:", datos.token); // <- Aparece en consola
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMensaje("Error del servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

      <input
        type="email"
        placeholder="Correo electrónico"
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="w-full p-2 rounded bg-gray-700 text-white"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {mensaje && <p className="text-red-500">{mensaje}</p>}

      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded"
      >
        Iniciar sesión
      </button>
    </form>
  );
}
