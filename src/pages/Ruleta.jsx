import React from "react";

const Ruleta = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">🎡 Ruleta</h1>
        <p className="text-lg mb-6">¡Próximamente podrás girar la ruleta y ganar premios increíbles!</p>

        <button
          disabled
          className="bg-yellow-500 text-black font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
        >
          Girar Ruleta (desactivado)
        </button>
      </div>
    </div>
  );
};

export default Ruleta;
