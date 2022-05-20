import {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ProtectedRoutes from "./ProtectedRoutes";
import Home from "./components/Home";
import Tasks from "./components/tasks/Tasks";
import TaskId from "./components/tasks/TaskId";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterForm from "./components/user/RegisterForm";
import LoginForm from "./components/user/LoginForm";
import NotFound from "./NotFound";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username, accessToken, refreshToken) => {
    setLoggedInUser({
      username: username,
      accessToken: accessToken,
      refreshToken: refreshToken,
      roles: ["user"]
    });
  };

  const handleLogout = username => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <Header loggedInUser={loggedInUser} onLogoutUser={handleLogout} />
      <Routes>
        <Route exact path="/" element={<Home loggedInUser={loggedInUser} />} />
        <Route element={<ProtectedRoutes loggedInUser={loggedInUser} />}>
          <Route
            path="/tasks"
            element={<Tasks loggedInUser={loggedInUser} />}
          ></Route>
          <Route
            path="/tasks/:id"
            element={<TaskId loggedInUser={loggedInUser} />}
          />
        </Route>
        <Route
          path="/login"
          element={<LoginForm onChangeUser={handleLogin} />}
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
