import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./components/Header";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header user="tomwey" />
      <TaskFilter />
      <TaskList countOpen="10" countClosed="3" />
      <Footer />
    </>
  );
}

export default App;
