import userConstants from "../constant/constant";
import { processLogout } from "./auth.action";
import { callApi, startLoader, stopLoader } from "./utilities.action";

export const findOrderLocationPrice = location => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`quote/detail/REALM-428190c75115fe0b3dff74eb8cd00a09`, "POST", {
      ...location
    });
    await dispatch({
      type: userConstants.FIRST_TRIP,
      payload,
      showMap: true
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    console.log(err);
    checkLogoutStatus(err, dispatch);
  }
};

export const findOrderLocationPriceAgain = location => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`quote/detail/REALM-e775d5ca14bd440e244ea374c1f57fc5`, "POST", {
      ...location
    });
    await dispatch({
      type: userConstants.SECOND_TRIP,
      payload,
      showMap: true
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    console.log(err);
    checkLogoutStatus(err, dispatch);
  }
};

export const setRoundTrip = bool => async dispatch => {
  try {
    await dispatch({
      type: userConstants.SET_ROUND_TRIP,
      payload: bool
    });
  } catch (err) {
    await stopLoader(dispatch);
    console.log(err);
    checkLogoutStatus(err, dispatch);
  }
};

export const saveTempOrder = data => async dispatch => {
  console.log(data);
  try {
    await dispatch({
      type: userConstants.TEMP_ORDER,
      payload: data
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    console.log(err);
    checkLogoutStatus(err, dispatch);
  }
};

const checkLogoutStatus = async (err, dispatch) => {
  dispatch(processLogout(err.message || err));
};
