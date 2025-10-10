import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import ProjectList from "../components/ProjectList";
import TaskList from "../components/TaskList";
import TaskModal from "../components/TaskModal"; // Import the modal
import projectService from "../services/projectService";
import taskService from "../services/taskService";

function DashboardPage({ projectId }) {
  const navigate = useNavigate();
  const [openTasks, setOpenTasks] = useState([]);
  const [closedTasks, setClosedTasks] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(projectId);

  // State for the new task modal
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const handleOnSelectTask = (taskId) => {
    navigate("/tasks/" + taskId);
  };

  const handleOnSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    navigate("/projects/" + projectId + "/tasks");
  };

  // Handlers for the modal
  const handleShowNewTaskModal = () => {
    if (selectedProjectId) {
      setShowNewTaskModal(true);
    } else {
      alert("Bitte wählen Sie zuerst ein Projekt aus.");
    }
  };
  const handleCloseNewTaskModal = () => setShowNewTaskModal(false);

  const handleSaveNewTask = () => {
    // The modal handles the creation via its internal state and service call.
    // We just need to close the modal and refresh the task list.
    setShowNewTaskModal(false);
    fetchTasks(); // Re-fetch tasks to display the new one
  };

  const handleOnFilterTasks = () => {};

  const handleOnSortTasks = () => {};

  useEffect(() => {
    console.log("useEffect: projectId=" + selectedProjectId);
    fetchProjects();
    if (selectedProjectId !== undefined) {
      fetchTasks();
    }
  }, [selectedProjectId]);

  useEffect(() => {
    // This effect updates the open/closed task counts whenever the taskList changes.
    const open = taskList.filter(
      (task) => task.state === "Open" || task.state === "OPEN",
    );
    const closed = taskList.filter(
      (task) => task.state === "Closed" || task.state === "DONE",
    );
    setOpenTasks(open);
    setClosedTasks(closed);
  }, [taskList]);

  const fetchTasks = async () => {
    if (!selectedProjectId) return;
    try {
      const response = await taskService.getTasksByProjectId(selectedProjectId);
      if (response.data._embedded && response.data._embedded.tasks) {
        setTaskList(response.data._embedded.tasks);
      } else {
        setTaskList([]);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Tasks:", error);
      setTaskList([]);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await projectService.getProjects();
      setProjectList(response.data._embedded.projects);
    } catch (error) {
      console.error("Fehler beim Laden der Projekte:", error);
    }
  };

  return (
    <>
      <Row>
        <Col xs={4} md={3}>
          <ProjectList
            projects={projectList}
            selectedProjectId={selectedProjectId}
            handleOnSelectProject={handleOnSelectProject}
          />
        </Col>
        <Col xs={9} md={9}>
          <TaskList
            tasks={taskList}
            countOpen={openTasks.length}
            countClosed={closedTasks.length}
            handleOnSelectTask={handleOnSelectTask}
            handleOnFilterTasks={handleOnFilterTasks}
            handleOnSortTasks={handleOnSortTasks}
            handleShowNewTaskModal={handleShowNewTaskModal} // Pass the handler
          />
        </Col>
      </Row>

      {/* Render the modal */}
      <TaskModal
        show={showNewTaskModal}
        handleClose={handleCloseNewTaskModal}
        handleSave={handleSaveNewTask}
        task={null} // null indicates a new task
        projectId={selectedProjectId}
      />
    </>
  );
}

export default DashboardPage;
