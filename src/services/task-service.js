class TaskService {
  async getTasksReportedByUser(http, accessToken) {
    return await http.get("/api/tasks");
  }

  async getTaskById(http, accessToken, id) {
    return await http.get("/api/tasks/" + id);
  }

  async putTaskById(http, accessToken, id, formData, toggleReminder, state) {
    const body = {
      text: formData.text,
      description: formData.description,
      day: formData.day,
      reminder: toggleReminder,
      state: state
    };
    return await http.put("/api/tasks/" + id, JSON.stringify(body));
  }

  async putChangeAssignees(http, accessToken, id, assignees) {
    return await http.put(
      "/api/tasks/" + id + "/assignees",
      JSON.stringify(assignees)
    );
  }

  async putChangeLabels(http, accessToken, id, labels) {
    return await http.put(
      "/api/tasks/" + id + "/labels",
      JSON.stringify(labels)
    );
  }

  async postNewTask(http, text, description, day, toggleReminder) {
    const body = {
      text: text,
      description: description,
      day: day,
      reminder: toggleReminder
    };
    return await http.post("/api/tasks", JSON.stringify(body));
  }
}

export default new TaskService();

/*
function getTasksWithQuery(accessToken, query) {
  const bearerToken = "Bearer " + accessToken;
  const url = "/api/tasks?query=" + query;
  const response = http({
    method: "get",
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: bearerToken
    }
  });

  return response;
}
*/
