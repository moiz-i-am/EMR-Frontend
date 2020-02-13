import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// register users / doctors

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

// register hospitals

export const registerHospital = (hospitalData, history) => dispatch => {
  axios
    .post("v1/hospital", hospitalData)
    .then(res => history.push("/Login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// register labs

export const registerLab = (labData, history) => dispatch => {
  axios
    .post("v1/lab", labData)
    .then(res => history.push("/Login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// login - get user token
// export const loginUser = userData => dispatch => {
//   axios
//     .post("v1/auth/login", userData)
//     .then(res => {
//       //save to localStorage
//       //set token to localStorage
//       const { token } = res.data;
//       localStorage.setItem("jwtToken", token);
//       //set token to auth header
//       setAuthToken(token);
//       //Decode token to get user data
//       const decode = jwt_decode(token);
//       //set current user
//       dispatch(setCurrentUser(decode));
//     })
//     .catch(err => {
//       //console.log(err)
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       });
//     });
// };

export const loginUser = (userData, history) => async dispatch => {
  try {
    // fetch data from a url endpoint
    const response = await axios.post("v1/auth/login", userData);
    // save to localStorage
    // set token to localStorage
    const { token } = await response.data;
    localStorage.setItem("jwtToken", token);
    // //set token to auth header
    setAuthToken(token);
    // //Decode token to get user data
    // const decode = await jwt_decode(token);
    // // //set current user
    // dispatch(setCurrentUser(decode));
    history.push("/dashboard");
  } catch (error) {
    //console.log("error", error);

    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

//set logged in user
export const setCurrentUser = decode => {
  return {
    type: SET_CURRENT_USER,
    payload: decode
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const logoutUser = history => dispatch => {
  // remove token from local storage
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  history.push("/");
};
