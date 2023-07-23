import axios from "axios";

const BASE_URL = "http://168.75.95.236:3333";
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

export default instance;