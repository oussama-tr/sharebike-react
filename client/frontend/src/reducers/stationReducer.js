import {
    GET_STATIONS,
    STATION_LOADING
    } from "../actions/types";
    
    const initialState = {
      stations: [],
      loading: false,
    };
    
    export default function(state = initialState, action) {
      switch (action.type) {
        case STATION_LOADING:
          return {
            ...state,
            loading: true
          };
        case GET_STATIONS:
          return {
            ...state,
            stations: action.payload,
            loading: false
          };
        default:
          return state;
      }
    }
    
    