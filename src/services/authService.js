import { api, extractStandardResponse } from "../api/api.js";
import router from "../router";

export const login = async ({ email, password }) => {
  try {
    await api.post("/api/login", { email, password }).then((res) => {
      const {
        data: { access_token, refresh_token },
      } = res;
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      return extractStandardResponse(res);
    });
    router.push("/boards");
  } catch (error) {}
};

export const logout = async () => {
  localStorage.clear("access_token");
  router.push("/login");
};

export const refresh = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  try {
    return await api
      .post("/api/refresh", { refresh_token })
      .then(extractStandardResponse);
  } catch (error) {
    throw error;
  }
};

export const checkIfTokenExists = () => {
  return !!localStorage.getItem("access_token");
};
