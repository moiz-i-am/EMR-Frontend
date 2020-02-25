import axios from "axios";
import { GET_USER_DATA, CLEAR_USER_DATA } from "./types";

export const getUserWithProfile = id => {
  const request = axios.get(`/v1/users/${id}`);

  return dispatch => {
    request.then(({ data }) => {
      let user = data;

      let response = {
        user
      };

      dispatch({
        type: GET_USER_DATA,
        payload: response
      });
    });
  };
};

export const clearUserWithProfile = () => {
  return {
    type: CLEAR_USER_DATA,
    payload: {
      user: {}
    }
  };
};
