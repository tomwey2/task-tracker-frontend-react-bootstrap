import qs from "qs";
import http from "../http-common";

function login(username, password) {
  /*
  http.interceptors.request.use(request => {
    console.log("Starting Request", JSON.stringify(request, null, 2));
    return request;
  });
  http.interceptors.response.use(response => {
    console.log("Response:", JSON.stringify(response, null, 2));
    return response;
  });
  */

  /*
   * Because the backende is only accepting login data using
   * the urlencode format, the data must be stringlify with
   * the qs lib.
   */
  const response = http({
    method: "post",
    url: "/login",
    data: qs.stringify({
      email: username,
      password: password
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
  });

  return response;
}

function register(username, email, password) {
  const response = http({
    method: "post",
    url: "/register",
    data: JSON.stringify({
      name: username,
      email: email,
      password: password
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response;
}

export default login;
