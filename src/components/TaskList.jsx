import {RecordCircle, Check2} from "react-bootstrap-icons";

import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

const TaskList = ({countOpen, countClosed, onSelectTask}) => {
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

  const AuthorFilter = () => (
    <Dropdown className="ms-auto" as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Author</Dropdown.Toggle>
    </Dropdown>
  );

  const LabelFilter = () => (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Label</Dropdown.Toggle>
    </Dropdown>
  );

  const ProjectFilter = () => (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Projects</Dropdown.Toggle>
    </Dropdown>
  );

  const AssigneeFilter = () => (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Assignee</Dropdown.Toggle>
    </Dropdown>
  );

  const Sort = () => (
    <Dropdown as={NavItem}>
      <Dropdown.Toggle as={NavLink}>Sort</Dropdown.Toggle>
    </Dropdown>
  );

  const CardHeader = () => (
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

  const TaskRow = ({task}) => (
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

  const CardBody = () => (
    <Table className="table-hover fs-6" size="sm">
      <tbody>
        {tasks.map(task => {
          return <TaskRow key={task.id} task={task} />;
        })}
      </tbody>
    </Table>
  );

  return (
    <Container>
      <Card>
        <Card.Header>
          <CardHeader />
        </Card.Header>
        <Card.Body>
          <CardBody />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TaskList;
