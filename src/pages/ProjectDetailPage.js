// src/pages/ProjectDetailPage.js
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import projectService from "../services/projectService";
import taskService from "../services/taskService";
import { Spinner, Alert, Card, ListGroup, Button } from "react-bootstrap";
import TaskModal from "../components/TaskModal"; // Erstellen wir als Nächstes

function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // States für das Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchProjectData = useCallback(async () => {
    try {
      setLoading(true);
      const projectRes = await projectService.getProjectById(projectId);
      setProject(projectRes.data);

      // Passe diesen Aufruf an, wie du Tasks abrufst
      const tasksRes = await taskService.getTasksByProjectId(projectId);
      setTasks(tasksRes.data._embedded.tasks);
    } catch (err) {
      setError("Fehler beim Laden der Projektdetails.");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  const handleTaskSave = () => {
    setShowModal(false);
    fetchProjectData(); // Daten neu laden nach Speichern
  };

  const handleTaskDelete = async (taskId) => {
    if (window.confirm("Möchtest du diesen Task wirklich löschen?")) {
      try {
        await taskService.deleteTask(taskId);
        fetchProjectData(); // Daten neu laden
      } catch (err) {
        alert("Fehler beim Löschen des Tasks.");
      }
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!project) return <Alert variant="warning">Projekt nicht gefunden.</Alert>;

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Tasks</h3>
        <Button
          variant="primary"
          onClick={() => {
            setSelectedTask(null);
            setShowModal(true);
          }}
        >
          Neuen Task erstellen
        </Button>
      </div>

      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item
            key={task.id}
            className="d-flex justify-content-between align-items-start"
          >
            <div>
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <small>
                Status: {task.state} | Fällig am:{" "}
                {new Date(task.deadline).toLocaleDateString()}
              </small>
              <br />
              <small>Zugewiesen an:</small>
            </div>
            <div>
              <Button
                variant="outline-secondary"
                size="sm"
                className="me-2"
                onClick={() => {
                  setSelectedTask(task);
                  setShowModal(true);
                }}
              >
                Bearbeiten
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleTaskDelete(task.id)}
              >
                Löschen
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <TaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleTaskSave}
        task={selectedTask}
        projectId={projectId}
      />
    </div>
  );
}

export default ProjectDetailPage;
