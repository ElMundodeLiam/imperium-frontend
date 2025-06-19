import React from "react";

export default function Tragamonedas() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400">🎰 Tragamonedas</h1>
      <p className="text-lg mb-4 text-center">
        Bienvenido al juego de tragamonedas de Imperium Casino. Próximamente aquí podrás jugar, apostar y ganar premios reales.
      </p>
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full text-center">
        <p className="text-white text-lg">
          🛠️ El juego se encuentra en desarrollo. ¡Muy pronto disponible!
        </p>
      </div>
    </div>
  );
}
