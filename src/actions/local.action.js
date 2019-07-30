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

export const saveFirstTripQuoteLocally = payload => async dispatch => {
  try {
    await dispatch({
      type: userConstants.FIRST_LOCAL_TRIP_QUOTE,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveSecondTripQuoteLocally = payload => async dispatch => {
  try {
    await dispatch({
      type: userConstants.SECOND_LOCAL_TRIP_QUOTE,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const setRoundTripLocally = payload => async dispatch => {
  try {
    await dispatch({
      type: userConstants.SET_ROUND_TRIP_LOCALLY,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const setMapToFalse = payload => async dispatch => {
  try {
    await dispatch({
      type: userConstants.SET_MAP_TO_FALSE,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const setFirstMapToFalse = payload => async dispatch => {
  try {
    await dispatch({
      type: userConstants.SET_FIRST_MAP_TO_FALSE,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const setSecondMapToFalse = payload => async dispatch => {
  try {
    await dispatch({
      type: userConstants.SET_SECOND_MAP_TO_FALSE,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const setTripCreated = payload => async dispatch => {
  try {
    await dispatch({
      type: userConstants.SET_TRIP_CREATED,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const resetLocalOrder = () => async dispatch => {
  try {
    await dispatch({
      type: userConstants.RESET_LOCAL_STORAGE
    });
  } catch (err) {
    console.log(err);
  }
};
