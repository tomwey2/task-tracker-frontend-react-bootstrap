import {RecordCircle, Check2} from "react-bootstrap-icons";
import * as React from "react";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {getTaskById, putTaskById} from "../../services/task-service";

import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

function TaskText({task, editmode, defaultValue, handleOnChange}) {
  return (
    <>
      {editmode ? (
        <>
          <Form.Control
            type="text"
            as="input"
            defaultValue={defaultValue}
            onChange={handleOnChange}
            className="m-1 w-75"
          />
        </>
      ) : (
        <>
          <h2>{task.text}</h2>
        </>
      )}
    </>
  );
}

function TaskDescription({task, editmode, defaultValue, handleOnChange}) {
  return (
    <>
      {editmode ? (
        <>
          <Form.Control
            as="textarea"
            rows="9"
            name="description"
            defaultValue={defaultValue}
            onChange={handleOnChange}
          />
        </>
      ) : (
        <p>{task.description}</p>
      )}
    </>
  );
}

function TaskAssignees({task}) {
  return (
    <>
      <h6>Assignees</h6>
      {task.assignees.map(x => x.name).join(", ")}
    </>
  );
}

function TaskLabels({task}) {
  return (
    <>
      <h6>Labels</h6>
      {task.labels.length > 0 ? (
        task.labels.map(label => {
          switch (label) {
            case "bug":
              return (
                <Badge bg="danger" className="ms-2">
                  {label}
                </Badge>
              );
            case "documentation":
              return (
                <Badge bg="primary" className="ms-2">
                  {label}
                </Badge>
              );
            case "duplicate":
              return (
                <Badge bg="secondary" className="ms-2">
                  {label}
                </Badge>
              );
            case "enhancement":
              return (
                <Badge bg="info" className="ms-2">
                  {label}
                </Badge>
              );
            case "help wanted":
              return (
                <Badge bg="success" className="ms-2">
                  {label}
                </Badge>
              );
            case "invalid":
              return (
                <Badge bg="warning" className="ms-2">
                  {label}
                </Badge>
              );
            case "question":
              return (
                <Badge bg="secondary" className="ms-2">
                  {label}
                </Badge>
              );
            default:
              return (
                <Badge bg="light" className="ms-2">
                  {label}
                </Badge>
              );
          }
        })
      ) : (
        <>
          <span>not yet</span>
        </>
      )}
    </>
  );
}

function TaskProject({task}) {
  return (
    <>
      <h6>consist of Project</h6>
      {task.consistOf ? (
        <>{task.consistOf.name} </>
      ) : (
        <>
          <span>not yet</span>
        </>
      )}
    </>
  );
}

function TaskHeader({
  task,
  editmode,
  handleEditmode,
  handleCancel,
  handleSave,
  defaultValueTaskText,
  handleOnChangeTaskText
}) {
  return (
    <>
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item>
          <span>#{task.id} </span>
        </Nav.Item>
        {editmode ? (
          <>
            <Nav.Item className="ms-auto">
              <Button variant="outline-dark" size="sm" onClick={handleSave}>
                Save
              </Button>
            </Nav.Item>
            <Nav.Item className="ms-2">
              <Button variant="outline-dark" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item className="ms-auto">
              <Button variant="outline-dark" size="sm" onClick={handleEditmode}>
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
          </>
        )}
      </Nav>

      <TaskText
        task={task}
        editmode={editmode}
        defaultValue={defaultValueTaskText}
        handleOnChange={handleOnChangeTaskText}
      />

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

function TaskBody({
  task,
  editmode,
  defaultValueTaskDescription,
  handleOnChangeTaskDescription
}) {
  return (
    <Container className="fluid">
      <Row>
        <Col md={9}>
          <Card className="h-100">
            <Card.Body>
              <TaskDescription
                task={task}
                editmode={editmode}
                defaultValue={defaultValueTaskDescription}
                handleOnChange={handleOnChangeTaskDescription}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card border="light">
            <Card.Body>
              <TaskAssignees task={task} />
            </Card.Body>
          </Card>

          <Card className="mt-2" border="light">
            <Card.Body>
              <TaskLabels task={task} />
            </Card.Body>
          </Card>

          <Card className="mt-2" border="light">
            <Card.Body>
              <TaskProject task={task} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function TaskId({user}) {
  const params = useParams();
  const [task, setTask] = useState(null);
  const [editmode, setEditmode] = useState(false);
  const [formData, setFormData] = useState({
    taskText: "",
    taskDescription: ""
  });

  const onChangeTaskText = e => {
    const value = e.target.value;
    setFormData({...formData, taskText: value});
  };

  const onChangeTaskDescription = e => {
    const value = e.target.value;
    setFormData({...formData, taskDescription: value});
  };

  useEffect(() => {
    fetchTaskById();
  }, []);

  useEffect(() => {}, [editmode]);

  const handleEditmode = () => {
    setEditmode(!editmode);
  };

  const handleOnCancel = () => {
    handleEditmode();
  };

  const handleOnSave = () => {
    updateTaskById();
    handleEditmode();
  };

  const fetchTaskById = async () => {
    console.log("fetch Task with id", params.id);
    const response = await getTaskById(user.accessToken, params.id);
    console.log(response.data);
    setTask(response.data);
    setFormData({
      ...formData,
      taskText: response.data.text,
      taskDescription: response.data.description
    });
  };

  const updateTaskById = async () => {
    console.log("update Task with id", params.id, formData);
    const response = await putTaskById(user.accessToken, params.id, formData);
    console.log(response.data);
    setTask(response.data);
    setFormData({
      ...formData,
      taskText: response.data.text,
      taskDescription: response.data.description
    });
  };

  // Get the userId param from the URL.
  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          {task != null ? (
            <TaskHeader
              task={task}
              editmode={editmode}
              handleEditmode={handleEditmode}
              handleCancel={handleOnCancel}
              handleSave={handleOnSave}
              defaultValueTaskText={formData.taskText}
              handleOnChangeTaskText={onChangeTaskText}
            />
          ) : (
            <></>
          )}
        </Card.Header>
        <Card.Body>
          {task != null ? (
            <TaskBody
              task={task}
              editmode={editmode}
              defaultValueTaskDescription={formData.taskDescription}
              handleOnChangeTaskDescription={onChangeTaskDescription}
            />
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TaskId;