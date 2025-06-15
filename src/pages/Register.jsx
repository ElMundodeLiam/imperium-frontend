import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://imperium-backend-bpkr.onrender.com/api/auth/register", {
        nombre,
        email,
        password,
      });

      if (res.data) {
        setMensaje("✅ Registro exitoso. Ya puedes iniciar sesión.");
        setNombre("");
        setEmail("");
        setPassword("");
      } else {
        setMensaje("Error al registrarse");
      }
    } catch (error) {
      setMensaje("El correo ya está registrado o hubo un error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 mb-4 rounded text-black"
          required
        />

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
          Registrarse
        </button>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-green-400">{mensaje}</p>
        )}
      </form>
    </div>
  );
};

export default Register;
