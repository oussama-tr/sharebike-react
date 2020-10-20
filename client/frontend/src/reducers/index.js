import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";
import slidersReducer from './slidersReducer';
import stationReducer from './stationReducer';


export default combineReducers({
  errors: errorReducer,
  event: eventReducer,
  slider: slidersReducer,
  station: stationReducer, 
});
