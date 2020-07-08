import axios from "axios";
import { GET_ERRORS } from "./types";

export const savePrescription = data => dispatch => {
  axios
    .post(`/v1/prescription`, data, {
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
