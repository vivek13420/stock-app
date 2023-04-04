import axios from "axios";
import * as types from "./actionTypes";

const fetchUser = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://stock-json-server.onrender.com/users/${id}`
    );
    dispatch({ type: types.SET_USER_DATA, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

const buyStock = (userId, userData) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `https://stock-json-server.onrender.com/users/${userId}`,
      userData
    );
    dispatch({ type: types.BUY_STOCK, payload: response.data.stocks_owned });
  } catch (error) {
    console.log(error);
  }
};

const removeStock = (userId, userData) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `https://stock-json-server.onrender.com/users/${userId}`,
      userData
    );
    dispatch({ type: types.REMOVE_STOCK, payload: response.data.stocks_owned });
  } catch (error) {
    console.log(error);
  }
};

export { fetchUser, buyStock, removeStock };
