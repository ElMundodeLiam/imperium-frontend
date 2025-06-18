import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [usuario, setUsuario] = useState("");
  const [saldo, setSaldo] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPerfil = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await fetch("https://imperium-backend-bpkr.onrender.com/api/user/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const datos = await res.json();

        if (res.ok) {
          setUsuario(datos.nombre || datos.correo);
          setSaldo(datos.saldo);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error al obtener perfil:", error);
        navigate("/");
      }
    };

    obtenerPerfil();
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">🎰 Bienvenido/a, {usuario}</h1>
        <p className="text-lg mb-4">💰 Saldo actual: <span className="text-green-400">${saldo}</span></p>

        <button
          onClick={cerrarSesion}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mb-6"
        >
          Cerrar sesión
        </button>

        <div style={{ color: "#fff", fontSize: "24px", padding: "20px" }}>
          ✅ Dashboard funciona correctamente.
        </div>
      </div>
    </div>
  );
}
