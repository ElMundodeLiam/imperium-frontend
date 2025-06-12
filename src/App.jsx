import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg">
        {showLogin ? (
          <>
            <Login />
            <p className="text-center mt-4">
              ¿No tienes cuenta?{' '}
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
              ¿Ya tienes cuenta?{' '}
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

export default App;
