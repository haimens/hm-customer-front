import constants from "../constant/constant";

const initialState = {
  round_trip: false,
  temp_order: "",
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
    order_token: "",
    trip_list: []
  },
  order_detail_in_payment: {
    trip_list: [{ amount: 0 }, { amount: 0 }],
    customer_info: {
      name: "",
      cell: "",
      email: "",
      note: ""
    },
    order_note_list: [{}],
    showMap: false
  },
  after_payment: {
    order_token: ""
  },
  order_history_from_customer: {
    record_list: [],
    count: 0,
    end: 0
  },
  flight_list_in_lord: {
    record_list: [],
    count: 0,
    end: 0
  },
  all_payment_resource: {
    payment_resource_info: {
      square_application_id: "",
      square_location_id: ""
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
    case constants.SET_MAP_TO_FALSE:
      return {
        ...state,
        first_trip: { ...state.first_trip, showMap: false },
        second_trip: { ...state.second_trip, showMap: false }
      };
    case constants.SET_SECOND_MAP_TO_FALSE:
      return {
        ...state,
        second_trip: { ...state.first_trip, showMap: false }
      };
    case constants.SET_FIRST_MAP_TO_FALSE:
      return {
        ...state,
        first_trip: { ...state.first_trip, showMap: false }
      };
    case constants.CURRENT_ORDER:
      return { ...state, current_order: action.payload };
    case constants.ORDER_DETAIL_IN_PAYMENT:
      return { ...state, order_detail_in_payment: { ...action.payload, showMap: action.showMap } };
    case constants.SET_ORDER_DETAIL_TO_FALSE:
      return { ...state, order_detail_in_payment: { ...state.order_detail_in_payment, showMap: action.showMap } };
    case constants.AFTER_PAYMENT:
      return { ...state, after_payment: action.payload };
    case constants.ORDER_HISTORY_FROM_CUSTOMER:
      return { ...state, order_history_from_customer: action.payload };
    case constants.RESET_ORDER:
      return {
        round_trip: false,
        temp_order: "",
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
          order_token: "",
          trip_list: []
        },
        order_detail_in_payment: {
          trip_list: [{ amount: 0 }, { amount: 0 }],
          customer_info: {
            name: "",
            cell: "",
            email: "",
            note: ""
          },
          order_note_list: [{}],
          showMap: false
        },
        after_payment: {
          order_token: ""
        },
        order_history_from_customer: {
          record_list: [],
          count: 0,
          end: 0
        }
      };
    case constants.FLIGHT_LIST_IN_LORD:
      return { ...state, flight_list_in_lord: action.payload };
    case constants.ALL_RESOURCE_IN_CUSTOMER:
      return { ...state, all_payment_resource: action.payload };

    default:
      return state;
  }
};
