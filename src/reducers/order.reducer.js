import constants from "../constant/constant";

const initialState = {
  round_trip: false,
  temp_order: "",
  first_trip: "",
  second_trip: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.TEMP_ORDER:
      return { ...state, temp_order: action.payload };
    case constants.FIRST_TRIP:
      return { ...state, first_trip: action.payload };
    case constants.SECOND_TRIP:
      return { ...state, second_trip: action.payload };
    case constants.SET_ROUND_TRIP:
      return { ...state, round_trip: action.payload };
    default:
      return state;
  }
};
