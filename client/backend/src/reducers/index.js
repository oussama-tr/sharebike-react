import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";
import stationReducer from "./stationReducer";
import sliderReducer from "./sliderReducer";
import bikeReducer from "./bikeReducer";


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  event: eventReducer,
  station: stationReducer,
  bike: bikeReducer,
  slider: sliderReducer

});
