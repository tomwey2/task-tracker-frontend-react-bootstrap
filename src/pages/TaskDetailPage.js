import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Form,
} from "react-bootstrap";
import taskService from "../services/taskService";

function TaskDetailPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await taskService.getTask(taskId);
        setTask(response.data);
        setFormData(response.data); // Initialize form data
        setError(null);
      } catch (err) {
        setError("Fehler beim Laden des Tasks.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await taskService.updateTask(taskId, formData);
      setTask(formData);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("Fehler beim Speichern des Tasks.");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setFormData(task);
    setIsEditing(false);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!task) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Kein Task gefunden.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card>
            <Card.Header as="h2">
              {isEditing ? (
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              ) : (
                task.title
              )}
            </Card.Header>
            <Card.Body>
              {isEditing ? (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Beschreibung</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Closed">Closed</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Priorität</Form.Label>
                        <Form.Select
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Fällig am</Form.Label>
                        <Form.Control
                          type="date"
                          name="dueDate"
                          value={formatDateForInput(formData.dueDate)}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <>
                  <Card.Text>
                    <strong>Beschreibung:</strong>
                    <br />
                    {task.description || "Keine Beschreibung vorhanden."}
                  </Card.Text>
                  <hr />
                  <Row>
                    <Col md={6}>
                      <p>
                        <strong>Status:</strong> {task.state}
                      </p>
                      <p>
                        <strong>Priorität:</strong> {task.priority}
                      </p>
                    </Col>
                    <Col md={6}>
                      <p>
                        <strong>Erstellt am:</strong>{" "}
                        {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Fällig am:</strong>{" "}
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : "Kein Fälligkeitsdatum"}
                      </p>
                    </Col>
                  </Row>
                </>
              )}
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between align-items-center">
              <span>Task ID: {task.id}</span>
              <div>
                {isEditing ? (
                  <>
                    <Button
                      variant="success"
                      onClick={handleSave}
                      className="me-2"
                    >
                      Speichern
                    </Button>
                    <Button variant="secondary" onClick={handleCancel}>
                      Abbrechen
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => setIsEditing(true)}>
                    Bearbeiten
                  </Button>
                )}
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskDetailPage;
