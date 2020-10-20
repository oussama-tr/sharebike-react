import axios from "../api";
import {
  ADD_BIKE,
  GET_BIKES,
  GET_BIKE,
  DELETE_BIKE,
  BIKE_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
  EDIT_BIKE,
  UNARCHIVE_BIKE,
  ARCHIVE_BIKE,
  IS_MODIFIED_BIKE
} from "./types";

export const addBike = (bikeData) => dispatch => {
  dispatch(clearErrors());
  axios.post("/bikes/add", bikeData)
    .then(res =>
      dispatch({
        type: ADD_BIKE,
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

export const editBike = (bikeData,id) => dispatch => {
  dispatch(clearErrors());
  axios.put(`/bikes/update/${id}`, bikeData)
    .then(res => {
      dispatch({
        type: EDIT_BIKE,
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

export const archiveBike = (id) => dispatch => {
  dispatch(clearErrors());
  axios.put(`/bikes/archive/${id}`)
    .then(res =>
      dispatch({
        type: ARCHIVE_BIKE,
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

export const unarchiveBike = (id) => dispatch => {
  dispatch(clearErrors());
  axios.put(`/bikes/unarchive/${id}`)
    .then(res =>
      dispatch({
        type: UNARCHIVE_BIKE,
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



export const getBikes = () => dispatch => {
  dispatch(setBikeLoading());
  axios
    .get("/bikes/")
    .then(res => {
      dispatch({
        type: GET_BIKES,
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

export const getBike = id => dispatch => {
  dispatch(setBikeLoading());
  axios
    .get(`/bikes/${id}`)
    .then(res =>
      dispatch({
        type: GET_BIKE,
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

export const deleteBike = id => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/bikes/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_BIKE,
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




// export const searchBikes = (min, max) => dispatch => {
//   const body = { min, max };
//   axios
//   .post('/BIKEs/search/',body)
//   .then(res =>
//     dispatch({
//       type: SEARCH_BIKE,
//       payload: res.data
//     })
//   )
//   .catch(error => {
//     if (error.response && error.response.data) {
//       dispatch({
//         type: GET_ERRORS,
//         payload: {
//           message: error.response.data,
//           visible: true
//         }
//       })
//     }
//   })
// }

// Set loading state
export const setBikeLoading = () => {
  return {
    type: BIKE_LOADING
  };
};
export const setIsModifiedBikeLoading = () => {
  return {
    type: IS_MODIFIED_BIKE
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
