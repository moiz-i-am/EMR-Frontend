import axios from "axios";
import { GET_TIME_DATA, GET_ERRORS } from "./types";

export const getDoctorTimeSlots = docData => {
  const request = axios.post(`/v1/scheduling/timeslots`, docData);
  return dispatch => {
    request.then(({ data }) => {
      let schedule = data;

      let response = {
        schedule
      };

      dispatch({
        type: GET_TIME_DATA,
        payload: response
      });
    });
  };
};

export const updateDoctorsSchedule = (
  updateScheduleData
  // history,
  // id,
  // token
) => dispatch => {
  axios
    .post(`/v1/scheduling/updateschedule`, updateScheduleData, {
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

export const deleteDoctorsSchedule = docData => dispatch => {
  axios.post(`/v1/scheduling/deleteschedule`, docData).then(res => {});
};
