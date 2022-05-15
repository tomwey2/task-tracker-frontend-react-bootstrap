import {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./components/Header";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

function App() {
  const [user, setUser] = useState("tomwey2");

  return (
    <>
      {user == null ? (
        <LoginForm />
      ) : (
        <>
          <Header user={user} />
          <TaskFilter />
          <TaskList />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
