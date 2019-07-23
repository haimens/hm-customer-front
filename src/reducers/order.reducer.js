import constants from "../constant/constant";

const initialState = {
  round_trip: false,
  temp_order: {},
  first_trip: {
    basic_info: {
      distance_text: "1.4 km",
      duration_text: "5 mins",
      distance_value: 1437,
      duration_value: 313,
      from_lat: 40.7547674,
      from_lng: -73.98491489999999,
      to_lat: 40.7545475,
      to_lng: -73.9745088,
      price_base: "3000",
      price_mile: "175",
      price_minute: "35",
      pickup_time: "2019/07/23 17:03",
      from_formatted: "1095 6th Ave, New York, NY 10036, USA",
      to_formatted: "245 Park Avenue, 245 Park Ave, New York, NY 10029, USA"
    },
    quote_list: [
      {
        quote_token: "QUT-a4d41e22b8e78fa2cb25fd54f4d109ee",
        img_path:
          "https://image.od-havana.com/doc/avatar/415891807ba81eb828a345b682618a2f/a1e60dc78feea85181d7b56979a766e4.jpeg",
        car_type_name: "SEDAN",
        amount: 3357,
        max_capacity: 4,
        price_prefix: 0
      }
    ],
    showMap: false
  },
  second_trip: {
    basic_info: {
      distance_text: "1.4 km",
      duration_text: "5 mins",
      distance_value: 1437,
      duration_value: 313,
      from_lat: 40.7547674,
      from_lng: -73.98491489999999,
      to_lat: 40.7545475,
      to_lng: -73.9745088,
      price_base: "3000",
      price_mile: "175",
      price_minute: "35",
      pickup_time: "2019/07/23 17:03",
      from_formatted: "1095 6th Ave, New York, NY 10036, USA",
      to_formatted: "245 Park Avenue, 245 Park Ave, New York, NY 10029, USA"
    },
    quote_list: [
      {
        quote_token: "QUT-a4d41e22b8e78fa2cb25fd54f4d109ee",
        img_path:
          "https://image.od-havana.com/doc/avatar/415891807ba81eb828a345b682618a2f/a1e60dc78feea85181d7b56979a766e4.jpeg",
        car_type_name: "SEDAN",
        amount: 3357,
        max_capacity: 4,
        price_prefix: 0
      }
    ],
    showMap: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.TEMP_ORDER:
      return { ...state, temp_order: action.payload };
    case constants.FIRST_TRIP:
      return { ...state, first_trip: action.payload, showMap: true };
    case constants.SECOND_TRIP:
      return { ...state, second_trip: action.payload, showMap: true };
    case constants.SET_ROUND_TRIP:
      return { ...state, round_trip: action.payload };
    default:
      return state;
  }
};
