import { refresh } from "@/services/authService";
import axios from "axios";
import router from "../router";
import { get } from "lodash";
import { toast } from "vue3-toastify";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token && !config._skipAuth) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (originalRequest.url.includes("/refresh")) {
      router.push("/login");
      return Promise.reject(err);
    }

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
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (get(err, "response.status") === 400) {
      toast(get(err, "response.data.error"), {
        type: "error",
        position: "top-center",
        dangerouslyHTMLString: true,
      });
    }
    return err;
  }
);

export const extractStandardResponse = (res) => res.data;
