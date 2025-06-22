// src/api/axios.js
import axios from "axios";

const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const API = axios.create({
  baseURL: `${base}/api`, // URL base de la API
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