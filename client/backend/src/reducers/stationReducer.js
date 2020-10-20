import {
  ADD_STATION,
  GET_STATIONS,
  GET_STATION,
  DELETE_STATION,
  STATION_LOADING,
  EDIT_STATION,
  UNARCHIVE_STATION,
  ARCHIVE_STATION,
  IS_MODIFIED_STATION,
  ADD_BIKE_STATION
} from "../actions/types";

const initialState = {
  stations: [],
  station: {},
  loading: false,
  search: [],
  searching: false,
  isModified:false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STATION_LOADING:
      return {
        ...state,
        loading: true
      };
      case IS_MODIFIED_STATION:
        return {
          ...state,
          isModified:false
        };
    case GET_STATIONS:
      return {
        ...state,
        stations: action.payload,
        loading: false
      };
    case GET_STATION:
      return {
        ...state,
        station: action.payload,
        loading: false
      };
    case ADD_STATION:
      return {
        ...state,
        stations: [...state.stations,action.payload],
        station: action.payload
      };
    case ADD_BIKE_STATION:
      return {
        ...state,
        stations: [...state.stations,action.payload],
        station: action.payload
      };

    case EDIT_STATION:
      return {
        ...state,
        isModified:true,
        stations: state.stations.map((station) => station._id === action.payload._id ? station = action.payload : station)
      };
    case DELETE_STATION:
      return {
        ...state,
        stations: state.stations.filter(station => station._id !== action.payload),
      };
    case UNARCHIVE_STATION:
    return {
      ...state,
      stations: state.stations.map((station) => station._id === action.payload._id ? station = action.payload : station)
    };
    case ARCHIVE_STATION:
    return {
      ...state,
      stations: state.stations.map((station) => station._id === action.payload._id ? station = action.payload : station)
    };
    default:
      return state;
  }
}

