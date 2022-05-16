import http from "../http-common";

class UserService {
  login(username, password) {
    const data = JSON.stringify({
      email: username,
      password: password
    });

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    return http.post("/login", data, config).then(response => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response.data);
      return response.data;
    });
  }
}

export default new UserService();
