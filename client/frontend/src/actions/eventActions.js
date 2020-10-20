import axios from "../api";
import {
  GET_EVENTS,
  GET_EVENT,
  EVENT_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
  GET_LATEST_EVENTS,
} from "../actions/types";

export const getEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get("/events/")
    .then(res => {
      dispatch({
        type: GET_EVENTS,
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

export const getLatestEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get("/events/latest")
    .then(res => {
      dispatch({
        type: GET_LATEST_EVENTS,
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

export const getEvent = id => dispatch => {
  dispatch(setEventLoading());
  axios
    .get(`/events/${id}`)
    .then(res => {
      dispatch({
        type: GET_EVENT,
        payload: res.data
      })
    }
    )
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
export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
