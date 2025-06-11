import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://imperium-backend-bpkr.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (response.ok) {
        alert("Usuario registrado exitosamente");
        navigate("/login");
      } else {
        setError(data.message || "Error al registrar");
      }
    } catch (err) {
      setError("Error de red o del servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
