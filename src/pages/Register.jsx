import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://imperium-backend-bpkr.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al registrar');
        return;
      }

      alert('Registro exitoso. Inicia sesión.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-4">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Registro</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 rounded bg-indigo-600 hover:bg-indigo-700 font-semibold"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
