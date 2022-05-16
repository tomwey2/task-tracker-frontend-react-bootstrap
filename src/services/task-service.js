import http from "../http-common";
class TaskService {
  getAll() {
    return http.get("/tasks");
  }
  get(id) {
    return http.get(`/tasks/${id}`);
  }
}
export default new TaskService();
