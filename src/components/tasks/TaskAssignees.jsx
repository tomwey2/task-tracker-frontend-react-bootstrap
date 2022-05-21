import Nav from "react-bootstrap/Nav";
import TaskAssigneesSelection from "./TaskAssigneesSelection";

function TaskAssignees({loggedInUser, task, handleOnChangeTask}) {
  return (
    <>
      <Nav>
        <Nav.Item>
          <b>Assignees</b>
        </Nav.Item>
        <Nav.Item className="ms-auto">
          <TaskAssigneesSelection
            loggedInUser={loggedInUser}
            task={task}
            handleOnChangeTask={handleOnChangeTask}
          />
        </Nav.Item>
      </Nav>
      {task.assignees.map(x => x.name).join(", ")}
    </>
  );
}

export default TaskAssignees;