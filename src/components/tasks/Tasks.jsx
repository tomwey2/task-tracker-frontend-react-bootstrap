import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router";
import TaskService from "../../services/task-service";
import {useDataAxios} from "./../../http-common";

import AuthContext from "../../AuthContext";
// Embedded components
import TasksFilter from "./TasksFilter";
import TasksList from "./TasksList";

/*
 * Main Component for the list of user tasks .
 * This component contains sub components to set a tasks filter
 * and to list all tasks (as table).
 */
function Tasks() {
  const navigate = useNavigate();
  const http = useDataAxios();
  const {loggedInUser} = useContext(AuthContext);
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
    navigate("/tasks?filter=" + requestQuery);
  }, [requestQuery]);

  const fetchTasks = async () => {
    const response = await TaskService.getTasksReportedByUser(
      http,
      loggedInUser.accessToken
    );
    setOpenTasks(response.data.filter(task => task.state === "Open"));
    setClosedTasks(response.data.filter(task => task.state === "Closed"));
  };

  return (
    <>
      <TasksFilter requestQuery={requestQuery} />
      <TasksList
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
