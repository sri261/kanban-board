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

export const addColumn = async ({ user_id, title }) => {
  try {
    const res = await api
      .post(`/api/board`, { title, user_id })
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteColumn = async (board_id) => {
  try {
    const res = await api
      .delete(`/api/board/${board_id}`)
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editColumn = async (title, user_id) => {
  try {
    const res = await api
      .put(`/api/board/${user_id}`, { title })
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};
