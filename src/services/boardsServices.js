import { api, extractStandardResponse } from "../api/api.js";

export const getBoards = async (user_id) => {
  try {
    const res = await api
      .get(`/api/boards/${user_id}`)
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addBoard = async ({ user_id, title }) => {
  try {
    const res = await api
      .post(`/api/board`, { title, user_id })
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBoard = async (board_id) => {
  try {
    const res = await api
      .delete(`/api/board/${board_id}`)
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editBoard = async (board_id, body) => {
  try {
    const res = await api
      .put(`/api/board/${board_id}`, { ...body })
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getBoard = async (board_id) => {
  try {
    const res = await api
      .get(`/api/board/${board_id}`)
      .then(extractStandardResponse);
    return res[0];
  } catch (error) {
    return error;
  }
};
