import constants from "../constant/constant";

const initialState = {
  name: "",
  phone: "",
  email: "",
  special_instruction: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.CONTACT_INFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
