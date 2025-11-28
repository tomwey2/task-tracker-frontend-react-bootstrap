import api from "./api";

const getUsers = () => api.get("/users");
const getUserById = (id) => api.get(`/users/${id}`);
const getUser = (href) => api.get(href);

const userService = {
  getUsers,
  getUserById,
  getUser,
};
export default userService;
