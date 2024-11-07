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
