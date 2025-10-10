import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import taskService from "../services/taskService";

function TaskDetailPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await taskService.getTask(taskId);
        setTask(response.data);
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

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Lädt...</span>
        </Spinner>
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
            <Card.Header as="h2">{task.title}</Card.Header>
            <Card.Body>
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
            </Card.Body>
            <Card.Footer className="text-muted">
              Task ID: {task.id}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskDetailPage;
