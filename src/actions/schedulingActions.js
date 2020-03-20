import axios from "axios";
import { GET_TIME_DATA } from "./types";

export const getDoctorTimeSlots = docData => {
  const request = axios.post(`/v1/scheduling/timeslots`, docData);
  return dispatch => {
    request.then(({ data }) => {
      let schedule = data;

      //schedule = JSON.stringify(schedule);
      //schedule = JSON.stringify(schedule, null, 4);

      //console.log("time data (axios): " + schedule);

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
