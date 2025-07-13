import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import ProjectList from "../components/ProjectList";
import TaskList from "../components/TaskList";
import projectService from "../services/projectService";
import taskService from "../services/taskService";

function DashboardPage({ projectId }) {
  const navigate = useNavigate();
  const [openTasks, setOpenTasks] = useState([]);
  const [closedTasks, setClosedTasks] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(projectId);

  const handleOnSelectTask = (taskId) => {
    navigate("/tasks/" + taskId);
  };

  const handleOnSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    //console.log("navigate to /tasks?project=" + projectId);
    navigate("/projects/" + projectId + "/tasks");
  };

  const handleOnFilterTasks = () => {};

  const handleOnSortTasks = () => {};

  useEffect(() => {
    console.log("useEffect: projectId=" + selectedProjectId);
    fetchProjects();
    if (selectedProjectId !== undefined) fetchTasks();
    setOpenTasks(taskList.map((task) => task.state === "Open"));
    setClosedTasks(taskList.map((task) => task.state === "Closed"));
  }, [selectedProjectId]);

  const fetchTasks = async () => {
    const response = await taskService.getTasksByProjectId(selectedProjectId);
    console.log("fetchTasks response=", response);
    if (response.data._embedded == undefined) {
      setTaskList([]);
    } else setTaskList(response.data._embedded.tasks);
  };

  const fetchProjects = async () => {
    const response = await projectService.getProjects();
    console.log("project response=", response);
    setProjectList(response.data._embedded.projects);
    console.log("projects=", projectList);
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
          />
        </Col>
      </Row>
    </>
  );
}

export default DashboardPage;
