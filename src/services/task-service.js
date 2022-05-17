import http from "../http-common";

function getTasksReportedByUser(accessToken) {
  const bearerToken = "Bearer " + accessToken;
  const response = http({
    method: "get",
    url: "/api/tasks/",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearerToken
    }
  });

  return response;
}

function get(id) {
  return http.get(`/tasks/${id}`);
}

export {getTasksReportedByUser};
