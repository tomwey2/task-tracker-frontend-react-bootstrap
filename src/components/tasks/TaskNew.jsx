import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

import {postNewTask} from "../../services/task-service";

function TaskText({handleOnChange}) {
  return (
    <>
      <p className="mt-2 mb-0 text-start">Text:</p>
      <Form.Control type="text" as="input" onChange={handleOnChange} />
    </>
  );
}

function TaskDescription({handleOnChange}) {
  return (
    <>
      <p className="mt-2 mb-0 text-start">Description:</p>
      <Form.Control
        as="textarea"
        rows="9"
        name="description"
        onChange={handleOnChange}
      />
    </>
  );
}

function TaskDay({
  defaultValueTaskDay,
  handleOnChangeTaskDay,
  toggleReminder,
  handleOnChangeToggleReminder
}) {
  return (
    <>
      <p className="mt-2 mb-0 text-start">Do task until:</p>
      <Nav className="mt-2">
        <Nav.Item>
          {" "}
          <Form.Control
            type="date"
            id="day-picker"
            label="day"
            defaultValue={defaultValueTaskDay}
            onChange={handleOnChangeTaskDay}
          />
        </Nav.Item>
        <Nav.Item className="ms-4">
          <Form.Check
            className="mt-2"
            type="switch"
            id="reminder-switch"
            label="remind me"
            checked={toggleReminder}
            onChange={handleOnChangeToggleReminder}
          />
        </Nav.Item>
      </Nav>
    </>
  );
}

function TaskNew({loggedInUser}) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [toggleReminder, setToggleReminder] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
    description: "",
    day: ""
  });

  const onChangeText = e => {
    const value = e.target.value;
    setFormData({...formData, text: value});
  };

  const onChangeDescription = e => {
    const value = e.target.value;
    setFormData({...formData, description: value});
  };

  const onChangeDay = e => {
    const value = e.target.value;
    setFormData({...formData, day: value});
  };

  const onChangeToggleReminder = e => {
    setToggleReminder(!toggleReminder);
  };

  const onSubmit = async e => {
    console.log("onSubmit");
    e.preventDefault();
    await postNewTask(loggedInUser.accessToken, formData, toggleReminder)
      // Authentication of user was successful
      .then(response => {
        console.log("Register success", response);
        setErrorMessage(null);
        // redirect to list of tasks
        navigate("/tasks/" + response.data.id);
      })
      // Authentication was unsuccessful
      .catch(error => {
        console.log("Login failed", error.response);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <Container className="p-4 text-center">
      <Row className="justify-content-center">
        <Col cxs={12} md={8}>
          {errorMessage != null ? (
            <h5 className="text-danger mt-2 text-center">{errorMessage}</h5>
          ) : (
            <></>
          )}
          <Card>
            <Card.Header>
              <Nav>
                <Nav.Item>
                  <h3>Create a new task</h3>
                </Nav.Item>
                <Nav.Item className="ms-auto">
                  <Button variant="success" size="sm" onClick={onSubmit}>
                    Save
                  </Button>
                </Nav.Item>
                <Nav.Item className="ms-2">
                  <Link
                    to="/tasks"
                    className="ms-2 btn btn-outline-dark btn-sm"
                    role="button"
                  >
                    Cancel
                  </Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <TaskText handleOnChange={onChangeText} />

                <TaskDescription handleOnChange={onChangeDescription} />
                <TaskDay
                  handleOnChangeTaskDay={onChangeDay}
                  toggleReminder={toggleReminder}
                  handleOnChangeToggleReminder={onChangeToggleReminder}
                />
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskNew;
