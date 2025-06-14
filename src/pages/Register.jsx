import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setMessage('Registro fallido');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error al registrarse');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-600 p-2 rounded w-full bg-white text-black"
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-600 p-2 rounded w-full bg-white text-black"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-600 p-2 rounded w-full bg-white text-black"
          required
        />

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded w-full"
        >
          Registrarse
        </button>

        {message && <p className="text-red-500 text-sm text-center">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
