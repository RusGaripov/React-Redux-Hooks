import * as actions from "../actions";

const initialState = {
  weather: null,
  one: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_WEATHER_REQUEST:
      return { ...state, loading: true };
    case actions.FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        loading: false,
        weather: action.payload,
        error: "",
      };
    case actions.FETCH_WEATHER_FAILURE:
      return {
        loading: false,
        weather: {},
        error: action.payload,
      };
    case actions.GET_ONE:
      return { ...state, one: action.one };
    case actions.DELETE_NEWS:
      return { ...state, one: null };
    default:
      return state;
  }
};
