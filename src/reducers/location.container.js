import constants from "../constant/constant";

const initialState = {
  pickup_location: "",
  dropoff_location: "",
  pickup_date: "",
  pickup_time: "",
  passenger_amount: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.PICKUP_LOCATION:
      return { ...state, pickup_location: action };
    case constants.PICKUP_DATE:
      return { ...state, pickup_date: action };
    case constants.PICKUP_TIME:
      return { ...state, pickup_time: action };
    case constants.DROPOFF_LOCATION:
      return { ...state, dropoff_location: action };
    case constants.PASSENGER_AMOUNT:
      return { ...state, passenger_amount: action };
    default:
      return state;
  }
};
