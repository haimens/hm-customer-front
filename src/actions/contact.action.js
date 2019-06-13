import constants from "../constant/constant";

export const saveContact = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.CONTACT_INFO,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};
