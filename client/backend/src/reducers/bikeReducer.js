import {
    ADD_BIKE,
    GET_BIKES,
    GET_BIKE,
    DELETE_BIKE,
    BIKE_LOADING,
    EDIT_BIKE,
    UNARCHIVE_BIKE,
    ARCHIVE_BIKE,
    IS_MODIFIED_BIKE
  } from "../actions/types";
  
  const initialState = {
    bikes: [],
    bike: {},
    loading: false,
    search: [],
    searching: false,
    isModified:false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case BIKE_LOADING:
        return {
          ...state,
          loading: true
        };
        case IS_MODIFIED_BIKE:
          return {
            ...state,
            isModified:false
          };
      case GET_BIKES:
        return {
          ...state,
          bikes: action.payload,
          loading: false
        };
      case GET_BIKE:
        return {
          ...state,
          bike: action.payload,
          loading: false
        };
      case ADD_BIKE:
        return {
          ...state,
          bikes: [...state.bikes,action.payload],
          bike: action.payload
        };
      case EDIT_BIKE:
        return {
          ...state,
          isModified:true,
          bikes: state.bikes.map((bike) => bike._id === action.payload._id ? bike = action.payload : bike)
        };
      case DELETE_BIKE:
        return {
          ...state,
          bikes: state.bikes.filter(bike => bike._id !== action.payload),
        };
      case UNARCHIVE_BIKE: 
      return {
        ...state,
        bikes: state.bikes.map((bike) => bike._id === action.payload._id ? bike = action.payload : bike)
      };
      case ARCHIVE_BIKE: 
      return {
        ...state,
        bikes: state.bikes.map((bike) => bike._id === action.payload._id ? bike = action.payload : bike)
      };
      default:
        return state;
    }
  }
  
  