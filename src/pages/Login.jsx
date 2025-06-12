// src/pages/Login.jsx import { useState } from 'react'; import { useNavigate } from 'react-router-dom';

export default function Login() { const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const navigate = useNavigate();

const handleLogin = async (e) => { e.preventDefault(); setError('');

try {
  const res = await fetch('https://imperium-backend-bpkr.onrender.com/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Error al iniciar sesión');
  }

  localStorage.setItem('token', data.token);
  navigate('/dashboard');
} catch (err) {
  setError(err.message);
}

};

return ( <div className="flex items-center justify-center h-screen bg-gray-100"> <form
onSubmit={handleLogin}
className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full"
> <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

{error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Usuario
      </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Contraseña
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>

    <div className="flex items-center justify-between">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Iniciar Sesión
      </button>
      <a
        href="/register"
        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
      >
        ¿Registrarse?
      </a>
    </div>
  </form>
</div>

); }

