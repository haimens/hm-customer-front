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
    order_token: "ORD-1f103dfae38fe06bdad64cdbcc54b53b",
    trip_list: ["TRIP-bd215c40c0ee7881f2b17cc5330b5c7c", "TRIP-5e4877bbccea4df05411b2dd32018337"]
  },
  order_detail_in_payment: {
    trip_list: [],
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
