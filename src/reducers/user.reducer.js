import constants from "../constant/constant";
const initialState = {
  current_user: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.CURRENT_USER:
      return { ...state, current_user: action.payload };
    default:
      return state;
  }
};
