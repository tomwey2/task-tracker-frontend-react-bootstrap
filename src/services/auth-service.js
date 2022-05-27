import http from "../http-common";

function register(username, email, password) {
  console.log("register: ", username, email, password);
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

export {register};
