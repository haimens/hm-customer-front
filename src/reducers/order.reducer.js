import constants from "../constant/constant";

const initialState = {
  first_trip: {
    basic_info: {
      distance_text: "",
      duration_text: "",
      distance_value: "",
      duration_value: "",
      from_lat: "",
      from_lng: "",
      to_lat: "",
      to_lng: "",
      price_base: "",
      price_mile: "",
      price_minute: "",
      pickup_time: "",
      from_formatted: "",
      to_formatted: ""
    },
    quote_list: [
      { quote_token: "", img_path: "", car_type_name: "", amount: "", max_capacity: "", price_prefix: "" },
      { quote_token: "", img_path: "", car_type_name: "", amount: "", max_capacity: "", price_prefix: "" }
    ]
  },
  second_trip: {
    basic_info: {
      distance_text: "",
      duration_text: "",
      distance_value: "",
      duration_value: "",
      from_lat: "",
      from_lng: "",
      to_lat: "",
      to_lng: "",
      price_base: "",
      price_mile: "",
      price_minute: "",
      pickup_time: "",
      from_formatted: "",
      to_formatted: ""
    },
    quote_list: [
      { quote_token: "", img_path: "", car_type_name: "", amount: "", max_capacity: "", price_prefix: "" },
      { quote_token: "", img_path: "", car_type_name: "", amount: "", max_capacity: "", price_prefix: "" }
    ]
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.FIRST_TRIP:
      return { ...state, first_trip: action.payload };
    case constants.SECOND_TRIP:
      return { ...state, second_trip: action.payload };
    default:
      return state;
  }
};
