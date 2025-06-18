import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://imperium-backend-bpkr.onrender.com/api/usuario/datos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsuario(res.data))
      .catch((err) => {
        console.error("Error al obtener usuario:", err);
        navigate("/");
      });
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const manejarRecarga = () => {
    // Aquí luego conectaremos al backend para recarga
    alert("Recargar saldo (pendiente de implementar)");
  };

  const manejarRetiro = () => {
    // Aquí luego conectaremos al backend para retiro
    alert("Retirar saldo (pendiente de implementar)");
  };

  const manejarHistorial = () => {
    // Aquí luego conectaremos al backend para historial
    alert("Ver historial (pendiente de implementar)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-gray-800 px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">🎰 Imperium Casino</h1>
        {usuario && (
          <div className="text-lg">
            Saldo: <span className="text-yellow-400">${usuario.saldo.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 p-6 space-y-4 shadow-lg">
          <button
            onClick={manejarRecarga}
            className="w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-600"
          >
            Recargar
          </button>
          <button
            onClick={manejarRetiro}
            className="w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-600"
          >
            Retirar
          </button>
          <button
            onClick={manejarHistorial}
            className="w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-600"
          >
            Historial
          </button>
          <button
            onClick={cerrarSesion}
            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar sesión
          </button>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-10">
          {usuario ? (
            <div>
              <h2 className="text-3xl font-bold mb-4">Bienvenido, {usuario.nombre}</h2>
              <p className="text-lg">
                Tu correo: <span className="text-yellow-400">{usuario.correo}</span>
              </p>
              <p className="text-lg mt-2">
                Tu saldo actual es:{" "}
                <span className="text-yellow-400">${usuario.saldo.toFixed(2)}</span>
              </p>
            </div>
          ) : (
            <p>Cargando datos del usuario...</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
