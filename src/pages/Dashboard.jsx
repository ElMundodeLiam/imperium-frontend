import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      const res = await fetch('https://imperium-backend-bpkr.onrender.com/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem('token');
        return navigate('/login');
      }

      const data = await res.json();
      setUsername(data.username);
      setBalance(data.balance);
    } catch (err) {
      console.error('Error al obtener perfil:', err);
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {username}</h1>
      <p className="text-xl mb-6">Tu saldo: <span className="font-semibold">${balance}</
