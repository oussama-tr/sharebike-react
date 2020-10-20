import axios from "../api";
import {
  GET_STATIONS,
  // GET_STATION,
  CLEAR_ERRORS,
  GET_ERRORS,
  STATION_LOADING
} from "./types";






export const getStations = () => dispatch => {
  dispatch(setStationLoading());
  axios
    .get("/stations/")
    .then(res => {
      console.log(res);
      console.log(res.data);

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

// export const getStation = id => dispatch => {
//   dispatch(setStationLoading());
//   axios
//     .get(`/stations/${id}`)
//     .then(res =>
//       dispatch({
//         type: GET_STATION,
//         payload: res.data
//       })
//     )
//     .catch(error => {
//       if (error.response && error.response.data) {
//         dispatch({
//           type: GET_ERRORS,
//           payload: {
//             message: error.response.data,
//             visible: true
//           }
//         })
//       }
//     })
// };





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
// export const setIsModifiedStationLoading = () => {
//   return {
//     type: IS_MODIFIED_STATION
//   };
// };

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
