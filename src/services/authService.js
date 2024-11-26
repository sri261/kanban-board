import { api, extractStandardResponse } from "../api/api.js";
import router from "../router";

export const login = async ({ email, password }) => {
  try {
    const { token } = await api
      .post("/api/login", { email, password })
      .then(extractStandardResponse);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
    router.push("/");
  } catch (error) {}
};

export const logout = async () => {
  localStorage.clear("token");
  router.push("/login");
};

export const checkIfTokenExists = () => {
  return !!localStorage.getItem("token");
};
