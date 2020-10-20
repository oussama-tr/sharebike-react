import axios from "../api";
import {
  ADD_SLIDER,
  GET_ALL_SLIDER,
  GET_SLIDER,
  GET_INACTIVE_SLIDER,
  DELETE_SLIDER,
  SLIDER_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
  EDIT_SLIDER,
  ARCHIVE_SLIDER,
  UNARCHIVE_SLIDER,
  IS_MODIFIED_SLIDER
  // SEARCH_EVENT,
} from "../actions/types";

export const addSlider = (eventData) => dispatch => {
  dispatch(clearErrors());
  axios.post("/slider/add", eventData)
    .then(res =>
        dispatch({
        type: ADD_SLIDER,
        payload: res.data
      })
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




export const getAllSlider = () => dispatch => {
  dispatch(setSliderLoading());
  axios
    .get("/slider")
    .then(res => {
      dispatch({
        type: GET_ALL_SLIDER,
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

export const archiveSlider = (id) => dispatch => {
  dispatch(clearErrors());
  axios.put(`/slider/archive/${id}`)
    .then(res =>
      dispatch({
        type: ARCHIVE_SLIDER,
        payload: res.data
      })
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

export const unarchiveSlider = (id) => dispatch => {
  dispatch(clearErrors());
  axios.put(`/slider/unarchive/${id}`)
    .then(res =>
      dispatch({
        type: UNARCHIVE_SLIDER,
        payload: res.data
      })
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


export const getArchived = () => dispatch => {
  dispatch(setSliderLoading());
  axios
    .get("/slider/all")
    .then(res => {
      dispatch({
        type: GET_INACTIVE_SLIDER,
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

export const getSlider = id => dispatch => {
  dispatch(setSliderLoading());
  axios
    .get(`/slider/id/${id}`)
    .then(res =>
      dispatch({
        type: GET_SLIDER,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};



export const deleteSlider = id => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/slider/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_SLIDER,
        payload: id
      })
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

export const editSlider = (eventData,id) => dispatch => {
  dispatch(clearErrors());
  axios.put(`/slider/update/${id}`, eventData)
    .then(res =>
      dispatch({
        type: EDIT_SLIDER,
        payload: res.data
      })
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

export const setIsModifiedSliderLoading = () => {
  return {
    type: IS_MODIFIED_SLIDER
  };
};

// Set loading state
export const setSliderLoading = () => {
  return {
    type: SLIDER_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
