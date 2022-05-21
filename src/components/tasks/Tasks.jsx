import {useState, useEffect} from "react";
import {useNavigate} from "react-router";
import {getTasksReportedByUser} from "../../services/task-service";

// Embedded components
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";

/*
 * Main Component for the list of user tasks .
 * This component contains sub components to set a tasks filter
 * and to list all tasks (as table).
 */
function Tasks({loggedInUser}) {
  const navigate = useNavigate();
  const [openTasks, setOpenTasks] = useState([]);
  const [closedTasks, setClosedTasks] = useState([]);
  const [isOpenTasks, setIsOpenTasks] = useState(true);
  const [requestQuery, setRequestQuery] = useState("is:open");

  const switchIsOpenTasks = isOpen => {
    setIsOpenTasks(isOpen);
  };

  const handleSelectTask = taskId => {
    navigate("/tasks/" + taskId);
  };

  useEffect(() => {
    console.log("useEffect []");
    fetchTasks();
  }, []);

  useEffect(() => {
    if (isOpenTasks) {
      setRequestQuery("is:open");
    } else {
      setRequestQuery("is:closed");
    }
  }, [isOpenTasks]);

  useEffect(() => {
    navigate("/tasks?query=" + requestQuery);
  }, [requestQuery]);

  const fetchTasks = async () => {
    console.log("fetch Tasks");
    const response = await getTasksReportedByUser(loggedInUser.accessToken);
    setOpenTasks(response.data.filter(task => task.state === "Open"));
    setClosedTasks(response.data.filter(task => task.state === "Closed"));
    console.log(response.data);
  };

  return (
    <>
      <TaskFilter requestQuery={requestQuery} />
      <TaskList
        loggedInUser={loggedInUser}
        tasks={isOpenTasks ? openTasks : closedTasks}
        countOpen={openTasks.length}
        countClosed={closedTasks.length}
        onSelectTask={handleSelectTask}
        handleIsOpenTasks={switchIsOpenTasks}
      />
    </>
  );
}

let testdata = [
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

export default Tasks;
