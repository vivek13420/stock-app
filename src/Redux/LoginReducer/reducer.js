import * as types from "./actionTypes";

const initialState = {
  userId: null,
  isAdmin: false,
  isAuth: false,
  isLoading: false,
  isError: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.GET_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        userId: payload,
      };

    case types.GET_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case types.GET_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAdmin: true,
        isAuth: true,
        userId: payload,
      };

    case types.LOGOUT_ACTION:
      return {
        ...state,
        isAdmin: false,
        isAuth: false,
        userId: null,
      };

    default:
      return state;
  }
};

export { reducer };
