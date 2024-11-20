import axios from "axios";

export const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export const extractStandardResponse = (res) => res.data;
