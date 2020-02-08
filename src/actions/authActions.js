import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// register user

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

// login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("v1/auth/login", userData)
    .then(res => {
      //save to localStorage
      //set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decode = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decode));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
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

export const logoutUser = () => dispatch => {
  // remove token from local storage
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
