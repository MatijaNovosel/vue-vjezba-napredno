import axios, { AxiosInstance } from "axios";

const httpClient: AxiosInstance = axios.create({
  baseURL: "https://localhost:44351/api",
  headers: {
    "Content-type": "application/json"
  }
});

export default httpClient;
