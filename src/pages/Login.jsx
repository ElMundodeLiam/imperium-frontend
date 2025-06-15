import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://imperium-backend-bpkr.onrender.com/api/auth/login", {
        email,
        password,
      });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMensaje("Inicio de sesión exitoso ✅");
        window.location.href = "/dashboard";
      } else {
        setMensaje("Error al iniciar sesión");
      }
    } catch (error) {
      setMensaje("Credenciales inválidas o usuario no registrado");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded text-black"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded text-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 p-2 rounded font-semibold"
        >
          Ingresar
        </button>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-red-400">{mensaje}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
