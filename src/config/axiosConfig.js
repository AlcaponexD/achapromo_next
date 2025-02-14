import axios from "axios";

//const BASE_URL = "http://localhost:3333";
const BASE_URL = "https://api.achapromo.com.br";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 40000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAuthorizationHeader() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common["Authorization"];
    }
  }
}

// Chamar a função de atualização do token no momento da criação da instância
setAuthorizationHeader();

//JWT Expired interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === "invalid JWT token"
    ) {
      // Token expirado, redirecionar para a página de login
      console.log(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
