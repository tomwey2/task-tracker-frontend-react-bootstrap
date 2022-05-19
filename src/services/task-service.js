import http from "../http-common";

function getTasksReportedByUser(accessToken) {
  const response = http({
    method: "get",
    url: "/api/tasks",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken
    }
  });

  return response;
}

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

function getTaskById(accessToken, id) {
  const response = http({
    method: "get",
    url: "/api/tasks/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken
    }
  });

  return response;
}

function putTaskById(accessToken, id, formData) {
  const response = http({
    method: "put",
    url: "/api/tasks/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken
    },
    data: JSON.stringify({
      text: formData.taskText,
      description: formData.taskDescription,
      day: "2022-05-19",
      reminder: true
    })
  });

  return response;
}

export {getTasksReportedByUser, getTaskById, putTaskById};
