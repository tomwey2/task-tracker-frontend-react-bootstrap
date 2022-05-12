import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./components/header.component.js";
import TaskFilter from "./components/taskfilter.component.js";
import TaskList from "./components/tasklist.component.js";
import Footer from "./components/footer.component.js";

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
