import axios from "axios";

export const restClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
});
