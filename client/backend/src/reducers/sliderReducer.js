import {
  ADD_SLIDER,
  GET_SLIDER,
  GET_INACTIVE_SLIDER,
  GET_ALL_SLIDER,
  DELETE_SLIDER,
  SLIDER_LOADING,
  SEARCH_SLIDER,
  EDIT_SLIDER,
  ARCHIVE_SLIDER,
  UNARCHIVE_SLIDER,
  IS_MODIFIED_SLIDER
} from '../actions/types';

const initialState = {
  allSlider: [],
  slider: {},
  loading: false,
  search: [],
  searching: false,
  isModified: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SLIDER_LOADING:
      return {
        ...state,
        loading: true
      };
      case IS_MODIFIED_SLIDER:
        return {
          ...state,
          isModified:false
        };
    case GET_ALL_SLIDER:
      return {
        ...state,
        allSlider: action.payload,
        slider: action.payload,
        loading: false
      };
    case GET_INACTIVE_SLIDER:
      return {
        ...state,
        allSlider: action.payload,
        slider: action.payload,
        loading: false
      };
    case GET_SLIDER:
      return {
        ...state,
        slider: action.payload,
        loading: false
      };
    case ADD_SLIDER:
      return {
        ...state,
        allSlider: [...state.allSlider, action.payload],
        slider: action.payload
      };
    case EDIT_SLIDER:
      return {
        ...state,
        isModified: true,
        allSlider: state.allSlider.map((slider) => slider._id === action.payload._id ? slider = action.payload : slider)
      };
    case UNARCHIVE_SLIDER:
      return {
        ...state,
        allSlider: state.allSlider.map(slider =>
          slider._id === action.payload._id ? (slider = action.payload) : slider
        )
      };
    case ARCHIVE_SLIDER:
      return {
        ...state,
        allSlider: state.allSlider.map(slider =>
          slider._id === action.payload._id ? (slider = action.payload) : slider
        )
      };
    case DELETE_SLIDER:
      return {
        ...state,
        allSlider: state.allSlider.filter(slider => slider._id !== action.payload)
      };

    case SEARCH_SLIDER:
      return {
        ...state,
        search: action.payload.allSlider,
        searching: action.payload.searching
      };
    default:
      return state;
  }
}
