import Nav from "react-bootstrap/Nav";
import TaskLabelsSelection from "./TaskLabelsSelection";
import TaskLabel from "./TaskLabel";

function TaskLabels({task, handleOnChangeTask}) {
  return (
    <>
      <Nav>
        <Nav.Item>
          <b>Labels</b>
        </Nav.Item>
        <Nav.Item className="ms-auto">
          <TaskLabelsSelection
            task={task}
            handleOnChangeTask={handleOnChangeTask}
          />
        </Nav.Item>
      </Nav>
      {task.labels.length > 0 ? (
        task.labels.map(x => (
          <div key="x">
            <TaskLabel label={x} short={true} />
          </div>
        ))
      ) : (
        <>
          <span>not yet</span>
        </>
      )}
    </>
  );
}

export default TaskLabels;
