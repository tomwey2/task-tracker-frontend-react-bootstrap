import api from "./api";

const getProjects = () => api.get("/projects");
const getProjectById = (id) => api.get(`/projects/${id}`);

const projectService = {
  getProjects,
  getProjectById,
};

export default projectService;
