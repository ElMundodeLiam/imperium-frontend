import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const partidos = [
  { id: 1, equipo1: "Argentina", equipo2: "Brasil" },
  { id: 2, equipo1: "España", equipo2: "Francia" },
  { id: 3, equipo1: "Alemania", equipo2: "Italia" },
];

const ApuestasFutbol = () => {
  const [saldo, setSaldo] = useState(0);
  const [monto, setMonto] = useState("");
  const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const obtenerSaldo = async () => {
      try {
        const res = await fetch("https://imperium-backend-bpkr.onrender.com/api/usuario/datos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setSaldo(data.balance);
      } catch (error) {
        console.error("Error al obtener saldo", error);
      }
    };

    obtenerSaldo();
  }, [token]);

  const apostar = async () => {
    if (!partidoSeleccionado || !monto) {
      setMensaje("Selecciona un partido y un monto.");
      return;
    }

    const montoNum = parseFloat(monto);

    if (isNaN(montoNum) || montoNum <= 0) {
      setMensaje("Monto inválido.");
      return;
    }

    if (montoNum > saldo) {
      setMensaje("Saldo insuficiente.");
      return;
    }

    try {
      const res = await fetch("https://imperium-backend-bpkr.onrender.com/api/usuario/actualizar-saldo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cantidad: -montoNum }),
      });

      if (res.ok) {
        setMensaje("✅ Apuesta realizada con éxito.");
        setSaldo((prev) => prev - montoNum);
        setMonto("");
        setPartidoSeleccionado(null);
      } else {
        setMensaje("Error al procesar la apuesta.");
      }
    } catch (error) {
      console.error("Error al apostar:", error);
      setMensaje("Error del servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
      >
        ⬅ Volver al Dashboard
      </button>

      <h2 className="text-3xl font-bold mb-4">⚽ Apuestas de Fútbol</h2>
      <p className="text-lg mb-4">💰 Saldo actual: <span className="text-yellow-400">${saldo.toFixed(2)}</span></p>

      <div className="mb-4">
        <label className="block mb-2">Selecciona un partido:</label>
        <select
          value={partidoSeleccionado || ""}
          onChange={(e) => setPartidoSeleccionado(e.target.value)}
          className="w-full p-2 rounded text-black"
        >
          <option value="">-- Seleccionar --</option>
          {partidos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.equipo1} vs {p.equipo2}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Monto a apostar:</label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="w-full p-2 rounded text-black"
          placeholder="Ej: 100"
        />
      </div>

      <button
        onClick={apostar}
        className="bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded font-semibold"
      >
        Apostar
      </button>

      {mensaje && <p className="mt-4 text-green-400">{mensaje}</p>}
    </div>
  );
};

export default ApuestasFutbol;
