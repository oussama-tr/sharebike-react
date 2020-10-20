import axios from './../api';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS } from './types';
// Register User
export const registerUser = userData => dispatch => {
  axios
    .post('/user/register', userData)
    .then(res =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: res.data,
          visible: true,
          success:true
        }
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: err.response.data,
          visible: true,
          success:false
        }
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post('/user/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      const decoded = jwt_decode(token);
      dispatch(clearErrors());
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {
          message: err.response.data,
          visible: true
        }
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  dispatch(setCurrentUser({}));
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
