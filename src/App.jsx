import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg">
        {showLogin ? (
          <>
            <Login />
            <p className="text-center mt-4">
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => setShowLogin(false)}
                className="text-yellow-400 hover:underline"
              >
                Regístrate
              </button>
            </p>
          </>
        ) : (
          <>
            <Register />
            <p className="text-center mt-4">
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => setShowLogin(true)}
                className="text-yellow-400 hover:underline"
              >
                Iniciar sesión
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Agrega más rutas aquí cuando hagamos juegos, apuestas, etc */}
      </Routes>
    </Router>
  );
}

export default App;
