import constants from "../constant/constant";

const initialState = {
  pickup_location: "",
  pickup_location_again: "",
  dropoff_location: "",
  dropoff_location_again: "",
  pickup_date: "",
  pickup_date_again: "",
  pickup_time: "",
  pickup_time_again: "",
  passenger_amount: "",
  passenger_amount_again: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.PICKUP_LOCATION:
      return { ...state, pickup_location: action };
    case constants.PICKUP_LOCATION_AGAIN:
      return { ...state, pickup_location_again: action };
    case constants.PICKUP_DATE:
      return { ...state, pickup_date: action };
    case constants.PICKUP_DATE_AGAIN:
      return { ...state, pickup_date_again: action };

    case constants.PICKUP_TIME:
      return { ...state, pickup_time: action };
    case constants.PICKUP_TIME_AGAIN:
      return { ...state, pickup_time_again: action };
    case constants.DROPOFF_LOCATION:
      return { ...state, dropoff_location: action };
    case constants.DROPOFF_LOCATION_AGAIN:
      return { ...state, dropoff_location_again: action };
    case constants.PASSENGER_AMOUNT:
      return { ...state, passenger_amount: action };
    case constants.PASSENGER_AMOUNT_AGAIN:
      return { ...state, passenger_amount_again: action };
    default:
      return state;
  }
};
