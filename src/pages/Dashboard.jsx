import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://imperium-backend-bpkr.onrender.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      onLogin(); // activa sesión en App.jsx
      navigate("/dashboard");
    } catch (error) {
      setMensaje("Credenciales inválidas");
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">🎰 Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white"
        />

        <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded font-bold">
          Iniciar Sesión
        </button>

        {mensaje && <p className="text-red-500 text-center mt-4">{mensaje}</p>}
      </form>
    </div>
  );
}

export default Login;
