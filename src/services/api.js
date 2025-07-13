import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.42:15001/api", // Ersetze dies mit deiner Backend-URL
});

// Interceptor, um den Token zu jeder Anfrage hinzuzufügen
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
