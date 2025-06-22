// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api' || "http://localhost:5000/api",
  withCredentials: true, // Para manejar cookies y sesiones si las implementamos
  timeout: 10000, // Tiempo máximo de espera para una respuesta
  headers: {
    "Content-Type": "application/json",
  }
});

// Interceptor para manejar errores globalmente
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;