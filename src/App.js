// src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Annahme: Pfad ist korrekt

// Importieren Sie alle Ihre Seiten-Komponenten
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

// Hilfskomponente für geschützte Routen
function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Lädt...</div>; // Oder einen Spinner anzeigen
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <Container className="mt-4">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route exact path="/" element={<Home />} />
            {/* Geschützte Routen */}
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:projectId/tasks"
              element={
                <PrivateRoute>
                  <DashboardPage projectId={1} />
                </PrivateRoute>
              }
            />

            {/* Fallback-Route, falls keine andere Route passt */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
