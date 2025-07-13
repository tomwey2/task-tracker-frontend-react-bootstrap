import api from "./api";

const login = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  if (response.data.token) {
    localStorage.setItem("authToken", response.data.token);
  }
  return response.data;
};

const register = async (username, password, email) => {
  const response = await api.post("/auth/register", {
    username,
    password,
    email,
  });
  if (response.data.token) {
    localStorage.setItem("authToken", response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("authToken");
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
