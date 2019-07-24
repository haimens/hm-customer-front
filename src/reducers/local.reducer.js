import constants from "../constant/constant";

const initialState = {
  round_trip: false,
  first_trip: {
    basic_info: {},
    quote_list: []
  },
  second_trip: {
    basic_info: {},
    quote_list: [{}]
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.FIRST_LOCAL_TRIP:
      return { ...state, first_local_trip: { ...action.payload, showMap: action.showMap } };
    case constants.SECOND_LOCAL_TRIP:
      return { ...state, second_local_trip: { ...action.payload, showMap: action.showMap } };

    default:
      return state;
  }
};
