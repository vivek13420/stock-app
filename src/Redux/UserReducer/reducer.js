import * as types from "./actionTypes";

const initialState = {
  username: "",
  email: "",
  password: "",
  id: "",
  stocks_owned: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_DATA:
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        id: action.payload.id,
        stocks_owned: action.payload.stocks_owned,
      };

    case types.BUY_STOCK:
      return {
        ...state,
        stocks_owned: action.payload,
      };

    case types.REMOVE_STOCK:
      return {
        ...state,
        stocks_owned: action.payload,
      };

    default:
      return state;
  }
};

export { userReducer };
