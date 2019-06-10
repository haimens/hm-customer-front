import constants from "../constant/constant";

export const savePickUp = location => async dispatch => {
  console.log(location + "hi");
  try {
    await dispatch({
      type: constants.PICKUP_LOCATION,
      location
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveDropOff = location => async dispatch => {
  console.log(location + "hi");
  try {
    await dispatch({
      type: constants.DROPOFF_LOCATION,
      location
    });
  } catch (err) {
    console.log(err);
  }
};

export const saveDate = date => async dispatch => {
  try {
    await dispatch({
      type: constants.PICKUP_DATE,
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
