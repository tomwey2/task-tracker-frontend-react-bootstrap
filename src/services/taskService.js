import api from "./api";

// Annahme: Dein Backend liefert Tasks pro Projekt.
// Falls GET /api/tasks alle Tasks liefert, musst du sie im Frontend filtern.
const getTasksByProjectId = (projectId) =>
  api.get(`/tasks?projectId=${projectId}`);

const createTask = (projectId, userId, taskData) =>
  api.post(`/projects/${projectId}/users/${userId}/tasks`, taskData);

const updateTask = (taskId, taskData) => api.put(`/tasks/${taskId}`, taskData);
const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

const taskService = {
  getTasksByProjectId,
  createTask,
  updateTask,
  deleteTask,
};
export default taskService;
