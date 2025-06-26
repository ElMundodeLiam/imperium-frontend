import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const simbolos = ["🍒", "🍋", "🍇", "🔔", "⭐", "🍉"];

function Tragamonedas() {
  const [reels, setReels] = useState(["❓", "❓", "❓"]);
  const [mensaje, setMensaje] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [girando, setGirando] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/");
    fetch("https://imperium-backend-bpkr.onrender.com/api/usuario/datos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setSaldo(data.balance))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, []);

  const girar = async () => {
    if (girando || saldo < 10) {
      setMensaje("Necesitas al menos 10 monedas para jugar");
      return;
    }

    setGirando(true);
    setMensaje("");

    const nuevosReels = Array(3)
      .fill()
      .map(() => simbolos[Math.floor(Math.random() * simbolos.length)]);
    setReels(nuevosReels);

    const esGanador =
      nuevosReels[0] === nuevosReels[1] && nuevosReels[1] === nuevosReels[2];

    try {
      const res = await fetch(
        "https://imperium-backend-bpkr.onrender.com/api/usuario/actualizar-saldo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cantidad: esGanador ? 40 : -10 }), // Si gana: +40 neto (ganancia 50 - costo 10)
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSaldo(data.nuevoSaldo);
        setMensaje(esGanador ? "¡Felicidades! 🎉 Ganaste 50 monedas" : "Perdiste 😢 Intenta otra vez");
      } else {
        setMensaje(data.mensaje || "Error al actualizar el saldo");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }

    setGirando(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">🎰 Tragamonedas</h1>
      <p className="mb-2 text-lg">Saldo actual: <span className="text-yellow-400">${saldo.toFixed(2)}</span></p>

      <div className="flex space-x-4 text-6xl my-6">
        {reels.map((simbolo, idx) => (
          <span key={idx}>{simbolo}</span>
        ))}
      </div>

      <button
        onClick={girar}
        disabled={girando}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded mb-4 disabled:opacity-50"
      >
        {girando ? "Girando..." : "Girar (10 monedas)"}
      </button>

      {mensaje && <p className="text-center text-lg mt-2">{mensaje}</p>}
    </div>
  );
}

export default Tragamonedas;
