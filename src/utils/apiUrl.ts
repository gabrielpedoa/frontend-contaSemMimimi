import axios from "axios";

export const BASE_URL = "http://localhost:5002/api";

export const apiUrl = axios.create({
  baseURL: BASE_URL,
});
