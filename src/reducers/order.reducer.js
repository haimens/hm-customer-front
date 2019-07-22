import constants from "../constant/constant";

const initialState = {
  round_trip: false,
  temp_order: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.TEMP_ORDER:
      return { ...state, temp_order: action.payload };
    case constants.SET_ROUND_TRIP:
      return { ...state, round_trip: action.payload };
    default:
      return state;
  }
};
