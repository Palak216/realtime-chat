import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("======================");
  console.log("🚀 Axios Request");
  console.log("URL:", config.baseURL + config.url);
  console.log("Method:", config.method);
  console.log("Body:", config.data);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("Headers:", config.headers);

  return config;
});

export default API;