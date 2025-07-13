import api from "./api";

const getUsers = () => api.get("/users");
const getUserById = (id) => api.get(`/users/${id}`);

const userService = {
  getUsers,
  getUserById,
};
export default userService;
