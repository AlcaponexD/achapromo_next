import axios from "axios";

const BASE_URL = "http://localhost:3333";

const instance = axios.create({
  baseURL: BASE_URL, // Altere para a URL base da sua API
  timeout: 10000, // Tempo máximo de espera para uma requisição (em milissegundos)
  headers: {
    "Content-Type": "application/json",
    // Outros cabeçalhos personalizados que você queira adicionar
  },
});

export default instance;
