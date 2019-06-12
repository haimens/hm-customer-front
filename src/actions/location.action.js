import constants from "../constant/constant";

export const savePickUp = location => async dispatch => {
  try {
    await dispatch({
      type: constants.PICKUP_LOCATION,
      location
    });
  } catch (err) {
    console.log(err);
  }
};
export const savePickUpAgain = location => async dispatch => {
  try {
    await dispatch({
      type: constants.PICKUP_LOCATION_AGAIN,
      location
    });
  } catch (err) {
    console.log(err);
  }
};
export const saveDropOff = location => async dispatch => {
  try {
    await dispatch({
      type: constants.DROPOFF_LOCATION,
      location
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveDropOffAgain = location => async dispatch => {
  try {
    await dispatch({
      type: constants.DROPOFF_LOCATION_AGAIN,
      location
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveDate = date => async dispatch => {
  console.log(date);
  try {
    await dispatch({
      type: constants.PICKUP_DATE,
      date
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveDateAgain = date => async dispatch => {
  console.log(date);
  try {
    await dispatch({
      type: constants.PICKUP_DATE_AGAIN,
      date
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveTime = time => async dispatch => {
  try {
    await dispatch({
      type: constants.PICKUP_TIME,
      time
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveTimeAgain = time => async dispatch => {
  try {
    await dispatch({
      type: constants.PICKUP_TIME_AGAIN,
      time
    });
  } catch (err) {
    console.log(err);
  }
};

export const savePassenger = number => async dispatch => {
  try {
    await dispatch({
      type: constants.PASSENGER_AMOUNT,
      number
    });
  } catch (err) {
    console.log(err);
  }
};

export const savePassengerAgain = number => async dispatch => {
  try {
    await dispatch({
      type: constants.PASSENGER_AMOUNT_AGAIN,
      number
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveFlight = flight_number => async dispatch => {
  try {
    await dispatch({
      type: constants.FLIGHT,
      flight_number
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveFlightAgain = flight_number => async dispatch => {
  try {
    await dispatch({
      type: constants.FLIGHT_AGAIN,
      flight_number
    });
  } catch (err) {
    console.log(err);
  }
};
