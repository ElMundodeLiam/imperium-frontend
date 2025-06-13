import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://imperium-backend-bpkr.onrender.com/api/auth/register", {
        email,
        password,
      });

      if (response.data.token) {
        setMessage("Registro exitoso. Ahora puedes iniciar sesión.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error al registrar.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition"
        >
          Registrarse
        </button>

        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </form>
    </div>
  );
}

export default Register;
