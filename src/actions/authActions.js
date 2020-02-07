import axios from "axios";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// register user

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("v1/users", userData)
    .then(res => history.push("/Login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
