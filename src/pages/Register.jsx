// src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://imperium-backend-bpkr.onrender.com/api/auth/register",
        formData
      );
      if (res.data.message === "Usuario registrado correctamente") {
        setMessage("Registro exitoso. Redirigiendo...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage("Error al registrar. Intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta en IMPERIUM CASINO</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg outline-none"
          required
        />
        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded">
          Registrarse
        </button>
        {message && <p className="mt-4 text-center text-red-400">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
