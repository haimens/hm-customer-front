import constants from "../constant/constant";

const initialState = {
  round_trip: false,
  temp_order: {},
  first_trip: {
    basic_info: {},
    quote_list: [{}],
    showMap: false
  },
  second_trip: {
    basic_info: {},
    quote_list: [{}],
    showMap: false
  },
  current_order: {
    order_token: "ORD-d384012297c29cb5d11212a529d231cf",
    trip_list: []
  },
  order_detail_in_payment: {
    trip_list: [{ amount: 0 }],
    customer_info: {
      name: "",
      cell: "",
      email: "",
      note: ""
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.TEMP_ORDER:
      return { ...state, temp_order: action.payload };
    case constants.FIRST_TRIP:
      return { ...state, first_trip: { ...action.payload, showMap: action.showMap } };
    case constants.SECOND_TRIP:
      return { ...state, second_trip: { ...action.payload, showMap: action.showMap } };
    case constants.SET_ROUND_TRIP:
      return { ...state, round_trip: action.payload };
    case constants.CURRENT_ORDER:
      return { ...state, current_order: action.payload };
    case constants.ORDER_DETAIL_IN_PAYMENT:
      return { ...state, order_detail_in_payment: action.payload };
    default:
      return state;
  }
};
