import axios from "axios";
import { GET_USER_DATA, CLEAR_USER_DATA, GET_ERRORS } from "./types";

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
