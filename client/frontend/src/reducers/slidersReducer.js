import {
  GET_SLIDERS,
  SLIDERS_LOADING
  } from "../actions/types";
  
  const initialState = {
    sliders: [],
    loading: false,
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SLIDERS_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_SLIDERS:
        return {
          ...state,
          sliders: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }
  
  