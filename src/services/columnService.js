import { api, extractStandardResponse } from "../api/api.js";

export const getColumns = async (board_id) => {
  try {
    const res = await api
      .get(`/api/columns/${board_id}`)
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addColumn = async ({ board_id, title, position }) => {
  try {
    const res = await api
      .post(`/api/columns/${board_id}`, { title, position })
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteColumn = async (column_id) => {
  try {
    const res = await api
      .delete(`/api/columns/${column_id}`)
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editColumn = async (title, column_id) => {
  try {
    const res = await api
      .put(`/api/columns/${column_id}`, { title })
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};
