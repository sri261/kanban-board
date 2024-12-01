import { refresh } from "@/services/authService";
import axios from "axios";

export const access_token = localStorage.getItem("access_token");

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (access_token && !config._skipAuth) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { refresh_token, access_token } = await refresh();
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("access_token", access_token);
        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        originalRequest._skipAuth = true;
        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

export const extractStandardResponse = (res) => res.data;
