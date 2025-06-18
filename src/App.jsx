// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

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
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("token") ? (
              <Dashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Aquí podrás añadir más rutas después (ruleta, tragamonedas, apuestas, etc) */}
      </Routes>
    </Router>
  );
}

export default App;
