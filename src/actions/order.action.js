import userConstants from "../constant/constant";
import { processLogout } from "./auth.action";
import { callApi, getPageIndex } from "../actions/utilities.action";

export const findOrderLocationPrice = location => async dispatch => {
  try {
    console.log(location);
    await startLoader(dispatch);
    const { payload } = await callApi(`quote/REALM-428190c75115fe0b3dff74eb8cd00a09`, "POST", {
      ...location
    });
    await dispatch({
      type: userConstants.ORDER_LOCATION_PRICE,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    console.log(err);
    checkLogoutStatus(err, dispatch);
  }
};

const startLoader = dispatch => {
  dispatch({
    type: userConstants.START_LOADING
  });
};

const stopLoader = dispatch => {
  dispatch({
    type: userConstants.STOP_LOADING
  });
};

const checkLogoutStatus = async (err, dispatch) => {
  dispatch(processLogout(err.message || err));
};
