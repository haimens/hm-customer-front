import constants from "../constant/constant";

const initialState = {
  order_location_price: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.ORDER_LOCATION_PRICE:
      return { ...state, order_location_price: action.payload };
    default:
      return state;
  }
};
