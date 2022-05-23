import {RecordCircle, Check2} from "react-bootstrap-icons";

import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

function AuthorFilter(props) {
  return (
    <Dropdown className="ms-auto" as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Author</Dropdown.Toggle>
    </Dropdown>
  );
}

function LabelFilter(props) {
  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Label</Dropdown.Toggle>
    </Dropdown>
  );
}

function ProjectFilter(props) {
  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Projects</Dropdown.Toggle>
    </Dropdown>
  );
}

function AssigneeFilter(props) {
  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Assignee</Dropdown.Toggle>
    </Dropdown>
  );
}

function Sort(props) {
  return (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Sort</Dropdown.Toggle>
    </Dropdown>
  );
}

function CardHeader({countOpen, countClosed, handleIsOpenTasks}) {
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link type="button" onClick={() => handleIsOpenTasks(true)}>
          <RecordCircle />
          <span className="ms-2">{countOpen}</span> Open
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link type="button" onClick={() => handleIsOpenTasks(false)}>
          <Check2 /> <span className="ms-2">{countClosed}</span> Closed
        </Nav.Link>
      </Nav.Item>
      <AuthorFilter />
      <LabelFilter />
      <ProjectFilter />
      <AssigneeFilter />
      <Sort />
    </Nav>
  );
}

function TaskRow({loggedInUser, task, onSelectTask}) {
  return (
    <tr key={task.id} onClick={() => onSelectTask(task.id)}>
      {/* a click on the tr navigates to /users/:id */}
      <td>
        <b>{task.text}</b>
        <small>
          <p>
            #{task.id} reported by {task.reportedBy.name}
          </p>
        </small>
      </td>
      <td></td>
      <td align="right">{task.assignees.map(x => x.name).join(", ")}</td>
    </tr>
  );
}

function CardBody({loggedInUser, tasks, onSelectTask}) {
  return (
    <Table className="table-hover fs-6" size="sm">
      <tbody>
        {tasks.map(task => {
          return (
            <TaskRow
              key={task.id}
              loggedInUser={loggedInUser}
              task={task}
              onSelectTask={onSelectTask}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

function TasksList({
  loggedInUser,
  tasks,
  countOpen,
  countClosed,
  onSelectTask,
  handleIsOpenTasks
}) {
  return (
    <Container>
      <Card>
        <Card.Header>
          <CardHeader
            countOpen={countOpen}
            countClosed={countClosed}
            handleIsOpenTasks={handleIsOpenTasks}
          />
        </Card.Header>
        <Card.Body>
          <CardBody
            loggedInUser={loggedInUser}
            tasks={tasks}
            onSelectTask={onSelectTask}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TasksList;