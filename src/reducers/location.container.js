import constants from "../constant/constant";

const initialState = {
  pickup_location: {
    location: ""
  },
  pickup_location_again: {
    location: ""
  },
  dropoff_location: {
    location: ""
  },
  dropoff_location_again: {
    location: ""
  },
  pickup_date: {
    date: ""
  },
  pickup_date_again: {
    date: ""
  },
  pickup_time: {
    time: ""
  },
  pickup_time_again: {
    time: ""
  },
  passenger_amount: {
    number: ""
  },
  passenger_amount_again: {
    number: ""
  },
  flight: {
    flight_number: ""
  },
  flight_again: {
    flight_number: ""
  }
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
    case constants.FLIGHT:
      return { ...state, flight: action };
    case constants.FLIGHT_AGAIN:
      return { ...state, flight_again: action };
    default:
      return state;
  }
};
