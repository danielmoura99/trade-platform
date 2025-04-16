// Correção para o api.ts
import axios from "axios";

// Configuração base do Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api.example.com/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      // Verifica se headers existe
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratar erros específicos (ex: 401, 403, etc)
    if (error.response && error.response.status === 401) {
      // Redirecionar para login ou renovar token
      console.error("Sessão expirada, faça login novamente");
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);

export default api;
