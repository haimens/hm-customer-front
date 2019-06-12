import constants from "../constant/constant";

export const savePickUp = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.PICKUP_LOCATION,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};
export const savePickUpAgain = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.PICKUP_LOCATION_AGAIN,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};
export const saveDropOff = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.DROPOFF_LOCATION,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveDropOffAgain = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.DROPOFF_LOCATION_AGAIN,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveDate = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.PICKUP_DATE,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveDateAgain = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.PICKUP_DATE_AGAIN,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveTime = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.PICKUP_TIME,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveTimeAgain = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.PICKUP_TIME_AGAIN,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const savePassenger = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.PASSENGER_AMOUNT,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const savePassengerAgain = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.PASSENGER_AMOUNT_AGAIN,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveFlight = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.FLIGHT,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveFlightAgain = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.FLIGHT_AGAIN,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveRoundTrip = payload => async dispatch => {
  try {
    await dispatch({
      type: constants.ROUND_TRIP,
      payload
    });
  } catch (err) {
    console.log(err);
  }
};
