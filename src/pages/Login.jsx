import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://imperium-backend-bpkr.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error de conexión con el servidor');
        return;
      }

      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-bold text-center">Iniciar Sesión</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded text-center">{error}</div>
        )}

        <div>
          <label className="block mb-1">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Tu nombre de usuario"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Tu contraseña"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
        >
          Iniciar Sesión
        </button>

        <div className="text-center mt-4">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-yellow-400 hover:underline">
            Regístrate
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
