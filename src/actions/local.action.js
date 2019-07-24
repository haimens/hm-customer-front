import userConstants from "../constant/constant";

export const saveFirstTripLocally = payload => async dispatch => {
  try {
    await dispatch({
      type: userConstants.FIRST_LOCAL_TRIP,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveSecondTripLocally = payload => async dispatch => {
  try {
    await dispatch({
      type: userConstants.SECOND_LOCAL_TRIP,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};
