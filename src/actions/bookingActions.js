import axios from "axios";
import { GET_ERRORS } from "./types";

export const createAppointmentBooking = (bookingData, token) => dispatch => {
  axios
    .post(`/v1/booking`, bookingData, {
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

export const deleteAppointmentBooking = (deleteData, token) => dispatch => {
  axios
    .post(`/v1/booking/deletebooking`, deleteData, {
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
