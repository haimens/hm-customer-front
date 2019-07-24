import constants from "../constant/constant";

const initialState = {
  first_local_trip: {
    basic_info: {},
    quote_list: [],
    selected_quote: ""
  },
  second_local_trip: {
    basic_info: {},
    quote_list: [{}],
    selected_quote: ""
  },
  round_trip_locally: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.FIRST_LOCAL_TRIP:
      return { ...state, first_local_trip: { ...action.payload } };
    case constants.SECOND_LOCAL_TRIP:
      return { ...state, second_local_trip: { ...action.payload } };
    case constants.FIRST_LOCAL_TRIP_QUOTE:
      return { ...state, first_local_trip: { ...state.first_local_trip, selected_quote: action.payload } };
    case constants.SECOND_LOCAL_TRIP_QUOTE:
      return { ...state, second_local_trip: { ...state.second_local_trip, selected_quote: action.payload } };
    case constants.SET_ROUND_TRIP_LOCALLY:
      return { ...state, round_trip_locally: action.payload };

    default:
      return state;
  }
};
