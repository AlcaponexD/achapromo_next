import axios from "axios";

const BASE_URL = "http://localhost:3333";
//const BASE_URL = "https://api.achapromo.com.br";

let headers = {
  "Content-Type": "application/json",
};

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
}

const instance = axios.create({
  baseURL: BASE_URL, // Altere para a URL base da sua API
  timeout: 10000, // Tempo máximo de espera para uma requisição (em milissegundos)
  headers: headers,
});

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
