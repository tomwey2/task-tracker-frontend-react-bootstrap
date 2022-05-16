import {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ProtectedRoutes from "./ProtectedRoutes";
import Home from "./components/Home";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = username => {
    console.log("handleLogin");
    setUser({username: username, roles: ["user"]});
  };

  const handleLogout = username => {
    console.log("handleLogout");
    setUser(null);
  };

  const Error404 = () => <h1>404 - Seite nicht gefunden</h1>;

  return (
    <Router>
      <Header user={user} onLogoutUser={handleLogout} />
      <Routes>
        <Route exact path="/" element={<Home user={user} />} />
        <Route element={<ProtectedRoutes user={user} />}>
          <Route path="/main" element={<Main user={user} />} />
        </Route>
        <Route
          path="/login"
          element={<LoginForm onChangeUser={handleLogin} />}
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" component={Error404} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;