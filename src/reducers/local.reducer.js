import constants from "../constant/constant";

const initialState = {
  first_local_trip: "",
  second_local_trip: "",
  round_trip_locally: false,
  trip_been_created: false
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
    case constants.SET_TRIP_CREATED:
      return { ...state, trip_been_created: action.payload };
    case constants.RESET_LOCAL_STORAGE:
      return { first_local_trip: "", second_local_trip: "", round_trip_locally: false, trip_been_created: false };
    default:
      return state;
  }
};
