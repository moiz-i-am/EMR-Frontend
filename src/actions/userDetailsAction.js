import axios from "axios";
import { GET_USER_DATA, CLEAR_USER_DATA, GET_ERRORS } from "./types";

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

export const updateUserData = (upUserData, history, id, token) => dispatch => {
  axios
    .patch(`/v1/users/${id}`, upUserData, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
    .then(res => {
      history.push(`/dashboard/${id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateSocketData = (upUserData, id, token) => dispatch => {
  axios
    .patch(`/v1/users/${id}`, upUserData, {
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

export const updateRatingData = (upRatingData, id) => dispatch => {
  axios
    .patch(`/v1/users/${id}`, upRatingData, {
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

export const createDoctorsSchedule = (
  addScheduleData,
  history,
  id,
  token
) => dispatch => {
  axios
    .post(`/v1/scheduling`, addScheduleData, {
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

export const clearUserWithProfile = () => {
  return {
    type: CLEAR_USER_DATA,
    payload: {
      user: {}
    }
  };
};
