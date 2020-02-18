import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

export const listUsers = userData => async dispatch => {
  try {
    const response = await axios.get("v1/users", userData);
    const { users } = await response.data;
    console.log(users);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
