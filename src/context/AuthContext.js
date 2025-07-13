import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api"; // Your configured Axios instance
import authService from "../services/authService";

// 1. Den Context mit einem Standardwert erstellen
const AuthContext = createContext(null);

// 2. Die Provider-Komponente erstellen
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dieser Effekt läuft einmal beim Start der App, um eine bestehende Sitzung zu prüfen
  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          // WICHTIG: Sie benötigen einen Endpunkt, der den aktuellen Benutzer basierend auf dem Token zurückgibt.
          // Z.B. ein GET /api/auth/me oder GET /api/auth/profile Endpunkt.
          const response = await api.get("/auth/me");
          setUser(response.data);
        } catch (error) {
          console.error("Sitzungsprüfung fehlgeschlagen", error);
          localStorage.removeItem("authToken");
        }
      }
      setLoading(false);
    };
    checkLoggedInUser();
  }, []);

  const login = async (username, password) => {
    // Den bestehenden authService verwenden, um sich einzuloggen und den Token zu erhalten
    await authService.login(username, password);
    // Nach dem Login das volle Benutzerprofil abrufen, um es im Context zu speichern
    const response = await api.get("/auth/me");
    setUser(response.data);
    return response.data;
  };

  const register = async (username, password, email) => {
    await authService.register(username, password, email);
    // Nach dem Login das volle Benutzerprofil abrufen, um es im Context zu speichern
    const response = await api.get("/auth/me");
    setUser(response.data);
    return response.data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Der Wert, der den konsumierenden Komponenten zur Verfügung gestellt wird
  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading: loading,
  };

  // Den Provider mit dem Wert rendern, aber erst, nachdem die anfängliche Ladeüberprüfung abgeschlossen ist,
  // um ein falsches Rendern von geschützten Routen zu verhindern.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Einen benutzerdefinierten Hook für den einfachen Zugriff auf den Context erstellen
export function useAuth() {
  return useContext(AuthContext);
}
