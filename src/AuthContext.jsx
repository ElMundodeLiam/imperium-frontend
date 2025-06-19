// src/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAutenticado(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ autenticado, setAutenticado }}>
      {children}
    </AuthContext.Provider>
  );
};
