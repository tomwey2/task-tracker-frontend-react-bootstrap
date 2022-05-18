import {RecordCircle, Check2} from "react-bootstrap-icons";
import * as React from "react";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {getTaskById} from "../../services/task-service";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CardHeader({task}) {
  return (
    <>
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item>
          <span>#{task.id} </span>
        </Nav.Item>
        <Nav.Item className="ms-auto">
          <Button variant="outline-dark" size="sm">
            Edit
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Link
            to="/tasks"
            className="ms-2 btn btn-success btn-sm"
            role="button"
          >
            Back to list
          </Link>
        </Nav.Item>
      </Nav>

      <h2>{task.text}</h2>
      <Button variant="success" size="sm" disabled>
        <RecordCircle />
        <span className="ms-2">{task.state}</span>
      </Button>

      <span className="ms-2">
        <b>{task.reportedBy.name}</b> opened this task at {task.createdAt}
      </span>
    </>
  );
}

function TaskDescription({task}) {
  return (
    <Card>
      <Card.Header>
        <span>
          <b>{task.reportedBy.name}</b> has created this task at{" "}
          {task.createdAt}
        </span>
      </Card.Header>
      <Card.Body>
        <p>{task.description}</p>
      </Card.Body>
    </Card>
  );
}

function TaskAssignees({task}) {
  return (
    <Card>
      <Card.Body>
        <h6>Assignees</h6>
        {task.assignees.map(x => x.name).join(", ")}
      </Card.Body>
    </Card>
  );
}

function TaskLabels({task}) {
  return (
    <Card className="mt-2" bg="">
      <Card.Body>
        <h6>Labels</h6>
        {task.labels.map(label => {
          return <span>{label}</span>;
        })}
      </Card.Body>
    </Card>
  );
}

function CardBody({task}) {
  return (
    <>
      <Row>
        <Col md={9}>
          <TaskDescription task={task} />
        </Col>
        <Col md={3}>
          <TaskAssignees task={task} />
          <TaskLabels task={task} />
        </Col>
      </Row>
    </>
  );
}

function TaskId({user}) {
  const params = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTaskById();
  }, []);

  const fetchTaskById = async () => {
    console.log("fetch Task with id", params.id);
    const response = await getTaskById(user.accessToken, params.id);
    console.log(response.data);
    setTask(response.data);
  };

  // Get the userId param from the URL.
  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          {task != null ? <CardHeader task={task} /> : <></>}
        </Card.Header>
        <Card.Body>{task != null ? <CardBody task={task} /> : <></>}</Card.Body>
      </Card>
    </Container>
  );
}

export default TaskId;
