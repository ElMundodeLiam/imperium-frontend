import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://imperium-backend-bpkr.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("✅ Registro exitoso. Ya puedes iniciar sesión.");
        setName("");
        setEmail("");
        setPassword("");

        // Redirigir al login después de un breve mensaje
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMensaje(data.mensaje || "Error al registrarse.");
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
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <p className="mt-4 text-center text-sm">
          ¿Ya tienes cuenta?{" "}
          <span
            className="text-yellow-400 cursor-pointer underline"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
