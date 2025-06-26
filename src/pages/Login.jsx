import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://imperium-backend-bpkr.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setMensaje(data.mensaje || "Credenciales inválidas");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error en el servidor");
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
          className="w-full bg-yellow-500 hover:bg-yellow-600 p-2 rounded font-semibold text-black"
        >
          Iniciar Sesión
        </button>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-red-400">{mensaje}</p>
        )}

        <p className="mt-4 text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <span
            className="text-blue-400 cursor-pointer underline"
            onClick={() => navigate("/")}
          >
            Regístrate
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
