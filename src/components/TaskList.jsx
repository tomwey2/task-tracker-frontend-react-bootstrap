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

function CardHeader({countOpen, countClosed}) {
  return (
    <Nav variant="tabs" defaultActiveKey="#first">
      <Nav.Item>
        <Nav.Link href="#open">
          <RecordCircle />
          <span className="ms-2">{countOpen}</span> Open
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#closed">
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

function TaskRow({task, onSelectTask}) {
  return (
    <tr onClick={() => onSelectTask(task)}>
      <td>
        <b>{task.text}</b>
        <small>
          <p>
            #{task.id} reported by {task.reportedBy}
          </p>
        </small>
      </td>
      <td></td>
      <td align="right">{task.assignees.map(x => x).join(", ")}</td>
    </tr>
  );
}

function CardBody({tasks, onSelectTask}) {
  return (
    <Table className="table-hover fs-6" size="sm">
      <tbody>
        {tasks.map(task => {
          return (
            <TaskRow key={task.id} task={task} onSelectTask={onSelectTask} />
          );
        })}
      </tbody>
    </Table>
  );
}

function TaskList({countOpen, countClosed, onSelectTask}) {
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

  return (
    <Container>
      <Card>
        <Card.Header>
          <CardHeader countOpen={countOpen} countClosed={countClosed} />
        </Card.Header>
        <Card.Body>
          <CardBody tasks={tasks} onSelectTask={onSelectTask} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TaskList;
