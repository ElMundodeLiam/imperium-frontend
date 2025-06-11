// src/App.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Imperium Casino</h1>
      <p className="mb-6">Elige una opción para comenzar:</p>
      <div className="flex gap-4">
        <Link to="/login" className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white">
          Iniciar Sesión
        </Link>
        <Link to="/register" className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white">
          Registrarse
        </Link>
      </div>
    </div>
  );
}
