import axios from "axios";
import { GET_USER_DATA, CLEAR_USER_DATA, GET_ERRORS } from "./types";

export const updateUserData = (data, id, token) => dispatch => {
  axios
    .patch(`/v1/users/${id}`, data, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
    .then(res => {})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteUser = (id, token) => dispatch => {
  axios
    .delete(`/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
