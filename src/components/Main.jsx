import {useState, useEffect} from "react";

import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";

import {getTasksReportedByUser} from "../services/task-service";

function Main({user}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("useEffect []");
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    console.log("fetch Tasks");
    const response = await getTasksReportedByUser(user.accessToken);
    setTasks(response.data);
    console.log(response.data);
  };

  return (
    <>
      <TaskFilter />
      <TaskList tasks={tasks} />
    </>
  );
}

let tasks = [
  {
    id: "1",
    text: "Food shopping",
    description: "One time in week food must be bought.",
    reportedBy: "John Doe",
    project: "p1",
    assignees: ["John Doe"]
  },
  {
    id: "2",
    text: "Doctor appointment",
    description: "Meet the doctor to ask him about new set of medicament",
    reportedBy: "John Doe",
    project: "p1",
    assignees: ["John Doe", "Jane Doe"]
  },
  {
    id: "3",
    text: "School party preparation",
    description: "",
    reportedBy: "John Doe",
    project: "p1",
    assignees: ["John Doe"]
  }
];

export default Main;
