import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const res = await fetch('https://imperium-backend-bpkr.onrender.com/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Error al obtener datos del usuario');
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar la información del usuario');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Panel de Usuario</h1>
      <p className="mb-2"><strong>Usuario:</strong> {user.username}</p>
      <p className="mb-4"><strong>Saldo:</strong> ${user.balance}</p>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
