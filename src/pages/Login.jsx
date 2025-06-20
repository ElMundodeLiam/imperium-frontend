import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(""); // <--- Cambiado a email
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch("https://imperium-backend-bpkr.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }) // 👈 Importante: debe ser "email"
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        localStorage.setItem("token", datos.token);
        navigate("/dashboard");
        window.location.reload(); // Recarga para que App.jsx detecte el token
      } else {
        setMensaje(datos.mensaje || "Credenciales inválidas");
      }
    } catch (error) {
      setMensaje("Error del servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={manejarEnvio} className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
        >
          Iniciar Sesión
        </button>

        {mensaje && <p className="mt-4 text-center text-red-400">{mensaje}</p>}
      </form>
    </div>
  );
};

export default Login;
