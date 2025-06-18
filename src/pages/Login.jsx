// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [correo, setCorreo] = useState("");
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
      body: JSON.stringify({ correo, password })
    });

    const datos = await respuesta.json();

    if (respuesta.ok) {
      localStorage.setItem("token", datos.token);
      alert("Token guardado:\n\n" + datos.token); // <-- Te lo muestra de nuevo
      setMensaje("Inicio de sesión exitoso");
      navigate("/dashboard");
    } else {
      setMensaje(datos.mensaje || "Error al iniciar sesión");
    }
  } catch (error) {
    setMensaje("Error del servidor");
  }
};
