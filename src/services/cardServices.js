import { api, extractStandardResponse } from "../api/api.js";

export const getCards = async (column_id) => {
  try {
    const res = await api
      .get(`/api/cards/${column_id}`)
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};
