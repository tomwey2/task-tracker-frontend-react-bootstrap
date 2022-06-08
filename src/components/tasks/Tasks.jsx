import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router";
import TaskService from "../../services/task-service";
import {useDataAxios} from "./../../http-common";

import AuthContext from "../../AuthContext";
// Embedded components
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

  const handleOnSelectTask = taskId => {
    navigate("/tasks/" + taskId);
  };

  const handleOnSearchTasks = isOpen => {
    console.log("SesarchTasks=", requestQuery);
    navigate("/tasks?query=" + requestQuery);
  };

  useEffect(() => {
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
    const response = await TaskService.getAllTasks(http);
    setOpenTasks(response.data.filter(task => task.state === "Open"));
    setClosedTasks(response.data.filter(task => task.state === "Closed"));
  };

  return (
    <>
      <TasksList
        tasks={isOpenTasks ? openTasks : closedTasks}
        countOpen={openTasks.length}
        countClosed={closedTasks.length}
        handleOnSelectTask={handleOnSelectTask}
        handleOnSearchTasks={handleOnSearchTasks}
        handleIsOpenTasks={switchIsOpenTasks}
        requestQuery={requestQuery}
      />
    </>
  );
}

export default Tasks;
