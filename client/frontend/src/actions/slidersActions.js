import axios from "../api";
import {
  GET_SLIDERS,
  SLIDERS_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
} from "./types";

export const getSliders = () => dispatch => {
  dispatch(setSlidersLoading());
  axios
    .get("/slider")
    .then(res => {
      dispatch({
        type: GET_SLIDERS,
        payload: res.data
      });
    })
    .catch(error => {
      if (error.response && error.response.data) {
        dispatch({
          type: GET_ERRORS,
          payload: {
            message: error.response.data,
            visible: true
          }
        })
      }
    })
};


// Set loading state
export const setSlidersLoading = () => {
  return {
    type: SLIDERS_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
