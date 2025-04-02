import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7050/api",
  // timeout: 20000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
    }
    return Promise.reject(error);
  }
);

export default api;
