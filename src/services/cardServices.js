import { api, extractStandardResponse } from "../api/api.js";

export const getCards = async (column_id) => {
  try {
    const res = await api
      .get(`/cards/${column_id}`)
      .then(extractStandardResponse);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createCard = async (data) => {
  try {
    return await api.post(`/card`, data).then(extractStandardResponse);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCard = async (card_id) => {
  try {
    return await api.delete(`/card/${card_id}`).then(extractStandardResponse);
  } catch (error) {
    console.log(error);
  }
};

export const editCard = async (card_id, data) => {
  try {
    return await api
      .put(`/card/${card_id}`, data)
      .then(extractStandardResponse);
  } catch (error) {
    console.log(error);
  }
};
