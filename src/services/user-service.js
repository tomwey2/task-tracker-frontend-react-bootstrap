import http from "../http-common";

function getAllUsers(accessToken) {
  const response = http({
    method: "get",
    url: "/api/users",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken
    }
  });

  return response;
}

export {getAllUsers};
