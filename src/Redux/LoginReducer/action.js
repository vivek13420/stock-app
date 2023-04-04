import axios from "axios";
import * as types from "./actionTypes";

const login = (payload) => (dispatch) => {
  dispatch({ type: types.GET_LOGIN_REQUEST });
  return (
    axios
      .get("https://stock-json-server.onrender.com/users")
      // .get("http://localhost:3000/users")
      .then((r) => {
        let user = r.data.find(
          (user) =>
            user.email === payload.email && user.password === payload.password
        );

        if (user) {
          if (
            user.email == "admin@stockbroker.com" &&
            user.password == "admin123"
          ) {
            dispatch({ type: types.GET_ADMIN_SUCCESS, payload: user.id });
            return user;
          } else {
            dispatch({ type: types.GET_LOGIN_SUCCESS, payload: user.id });
            return user;
          }
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        dispatch({ type: types.GET_LOGIN_ERROR });
      })
  );
};

export { login };
