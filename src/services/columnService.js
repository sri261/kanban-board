import { api, extractStandardResponse } from "../api/api.js";

export const getColumns = async (board_id) => {
  try {
    const res = await api
      .get(`/columns/${board_id}`)
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addColumn = async ({ board_id, title, position }) => {
  try {
    const res = await api
      .post(`/columns/${board_id}`, { title, position })
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteColumn = async (column_id) => {
  try {
    const res = await api
      .delete(`/columns/${column_id}`)
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editColumn = async (title, column_id) => {
  try {
    const res = await api
      .put(`/columns/${column_id}`, { title })
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};
