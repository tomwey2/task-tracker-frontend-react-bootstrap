import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import taskService from "../services/taskService";
import userService from "../services/userService";

function TaskModal({ show, handleClose, handleSave, task, projectId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("OPEN");
  const [deadline, setDeadline] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [users, setUsers] = useState([]);

  // Annahme: Die ID des eingeloggten Users ist bekannt (hier hartkodiert, sollte aus Auth-Context kommen)
  const loggedInUserId = 1;

  useEffect(() => {
    // Fülle das Formular, wenn ein Task zur Bearbeitung übergeben wird
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setState(task.state);
      setDeadline(task.deadline.split("T")[0]); // Format für <input type="date">
      //setAssigneeId(task.assignee.id);
    } else {
      // Reset für neuen Task
      setTitle("");
      setDescription("");
      setState("OPEN");
      setDeadline("");
      setAssigneeId("");
    }

    // Lade Benutzer für das Dropdown-Menü
    const fetchUsers = async () => {
      try {
        const response = await userService.getUsers();
        setUsers(response.data._embedded.userResponseDtoList);
      } catch (error) {
        console.error("Fehler beim Laden der Benutzer", error);
      }
    };
    fetchUsers();
  }, [task, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, state, deadline, assigneeId };

    try {
      if (task) {
        // Bearbeiten
        await taskService.updateTask(task.id, taskData);
      } else {
        // Erstellen
        await taskService.createTask(projectId, loggedInUserId, taskData);
      }
      handleSave();
    } catch (error) {
      console.error("Fehler beim Speichern des Tasks", error);
      alert("Speichern fehlgeschlagen!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {task ? "Task bearbeiten" : "Neuen Task erstellen"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Titel</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Beschreibung</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fälligkeitsdatum</Form.Label>
            <Form.Control
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Zugewiesener Benutzer</Form.Label>
            <Form.Select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              required
            >
              <option value="">Bitte auswählen</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="OPEN">Offen</option>
              <option value="IN_PROGRESS">In Bearbeitung</option>
              <option value="DONE">Erledigt</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
          <Button variant="primary" type="submit">
            Speichern
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TaskModal;
