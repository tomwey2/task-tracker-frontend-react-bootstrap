class UserService {
  getAllUsers(http, accessToken) {
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
}
export default new UserService();
