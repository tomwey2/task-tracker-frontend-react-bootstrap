import {useState, useEffect} from "react";

import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import TaskService from "../services/task-service";

function Main({user}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("useEffect []");
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    console.log("fetch Tasks");
    const response = await TaskService.getAll();
    setTasks(response.data);
    console.log(response.data);
  };

  return (
    <>
      <TaskFilter />
      <TaskList />
    </>
  );
}

export default Main;
