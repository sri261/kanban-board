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

export const createCard = async (data) => {
  try {
    return await api.post(`/api/card`, data).then(extractStandardResponse);
  } catch (error) {
    console.log(error);
  }
};
