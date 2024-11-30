import axios from "axios";

export const access_token = localStorage.getItem("access_token");

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

export const extractStandardResponse = (res) => res.data;
