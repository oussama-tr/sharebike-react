import axios from "../api";
import {
  ADD_STATION,
  ADD_BIKE_STATION,
  GET_STATIONS,
  GET_STATION,
  DELETE_STATION,
  STATION_LOADING,
  CLEAR_ERRORS,
  GET_ERRORS,
  EDIT_STATION,
  UNARCHIVE_STATION,
  ARCHIVE_STATION,
  IS_MODIFIED_STATION
} from "./types";

export const addStation = (stationData) => dispatch => {
  dispatch(clearErrors());
  axios.post("/stations/add", stationData)
    .then(res =>
      dispatch({
        type: ADD_STATION,
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
export const addBikeToStation = (stationData) => dispatch => {
  dispatch(clearErrors());
  axios.post("/stations/BikeStation/add", stationData)
      .then(res =>
          dispatch({
            type: ADD_BIKE_STATION,
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

export const editStation = (stationData,id) => dispatch => {
  dispatch(clearErrors());
  axios.put(`/stations/update/${id}`, stationData)
    .then(res => {
      dispatch({
        type: EDIT_STATION,
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

export const archiveStation = (id) => dispatch => {
  dispatch(clearErrors());
  axios.put(`/stations/archive/${id}`)
    .then(res =>
      dispatch({
        type: ARCHIVE_STATION,
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

export const unarchiveStation = (id) => dispatch => {
  dispatch(clearErrors());
  axios.put(`/stations/unarchive/${id}`)
    .then(res =>
      dispatch({
        type: UNARCHIVE_STATION,
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



export const getStations = () => dispatch => {
  dispatch(setStationLoading());
  axios
    .get("/stations/")
    .then(res => {
      dispatch({
        type: GET_STATIONS,
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

export const getStation = id => dispatch => {
  dispatch(setStationLoading());
  axios
    .get(`/stations/${id}`)
    .then(res =>
      dispatch({
        type: GET_STATION,
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

export const deleteStation = id => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/stations/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_STATION,
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




// export const searchStations = (min, max) => dispatch => {
//   const body = { min, max };
//   axios
//   .post('/STATIONs/search/',body)
//   .then(res =>
//     dispatch({
//       type: SEARCH_STATION,
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
export const setStationLoading = () => {
  return {
    type: STATION_LOADING
  };
};
export const setIsModifiedStationLoading = () => {
  return {
    type: IS_MODIFIED_STATION
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
