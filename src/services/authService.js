import { api, extractStandardResponse } from "../api/api.js";
import router from "../router";

export const login = async ({ email, password }) => {
  try {
    const { token } = await api
      .post("/api/login", { email, password })
      .then(extractStandardResponse);
    localStorage.setItem("token", token);
    router.push("/");
  } catch (error) {}
};

export const checkIfTokenExists = () => {
  return !!localStorage.getItem("token");
};
