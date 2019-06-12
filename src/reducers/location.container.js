import constants from "../constant/constant";

const initialState = {
  firstTrip: {
    pickup_location: {
      location: ""
    },
    dropoff_location: {
      location: ""
    },
    pickup_date: {
      date: ""
    },
    pickup_time: {
      time: ""
    },
    passenger_amount: {
      number: ""
    },
    flight: {
      flight_number: ""
    }
  },
  secondTrip: {
    pickup_location: {
      location: ""
    },
    dropoff_location: {
      location: ""
    },
    pickup_date: {
      date: ""
    },
    pickup_time: {
      time: ""
    },
    passenger_amount: {
      number: ""
    },
    flight: {
      flight_number: ""
    }
  },

  roundTrip: {
    boolean: false
  }
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case constants.PICKUP_LOCATION:
      return { ...state, firstTrip: { ...state.firstTrip, pickup_location: action.payload } };
    case constants.PICKUP_DATE:
      return { ...state, firstTrip: { ...state.firstTrip, pickup_date: action.payload } };
    case constants.PICKUP_TIME:
      return { ...state, firstTrip: { ...state.firstTrip, pickup_time: action.payload } };
    case constants.DROPOFF_LOCATION:
      return { ...state, firstTrip: { ...state.firstTrip, dropoff_location: action.payload } };
    case constants.PASSENGER_AMOUNT:
      return { ...state, firstTrip: { ...state.firstTrip, passenger_amount: action.payload } };
    case constants.FLIGHT:
      return { ...state, firstTrip: { ...state.firstTrip, flight: action.payload } };

    case constants.PICKUP_LOCATION_AGAIN:
      return { ...state, secondTrip: { ...state.secondTrip, pickup_location: action.payload } };
    case constants.PICKUP_DATE_AGAIN:
      return { ...state, secondTrip: { ...state.secondTrip, pickup_date: action.payload } };
    case constants.PICKUP_TIME_AGAIN:
      return { ...state, secondTrip: { ...state.secondTrip, pickup_time: action.payload } };
    case constants.DROPOFF_LOCATION_AGAIN:
      return { ...state, secondTrip: { ...state.secondTrip, dropoff_location: action.payload } };
    case constants.PASSENGER_AMOUNT_AGAIN:
      return { ...state, secondTrip: { ...state.secondTrip, passenger_amount: action.payload } };
    case constants.FLIGHT_AGAIN:
      return { ...state, secondTrip: { ...state.secondTrip, flight: action.payload } };

    case constants.ROUND_TRIP:
      return { ...state, roundTrip: action.payload };

    default:
      return state;
  }
};
