import userConstants from "../constant/constant";
import { processLogout } from "./auth.action";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";

export const findOrderLocationPrice = location => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`quote/detail/${process.env.REACT_APP_REALM_TOKEN}`, "POST", {
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
    const { payload } = await callApi(`quote/detail/${process.env.REACT_APP_REALM_TOKEN}`, "POST", {
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

export const createAOrder = (body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`order/detail`, "POST", body);
    await dispatch({
      type: userConstants.CURRENT_ORDER,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const getOrderDetail = order_token => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`order/detail/${order_token}`, "GET");
    await dispatch({
      type: userConstants.ORDER_DETAIL_IN_PAYMENT,
      payload
    });
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const applyCouponToOrder = (order_token, body) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`order/discount/${order_token}`, "POST", body);
    await launchSuccess(dispatch);
    await dispatch(getOrderDetail(order_token));
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const removeCouponToOrder = (order_token, order_discount_token, body) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`order/discount/${order_token}/${order_discount_token}`, "PATCH", body);
    await launchSuccess(dispatch);
    await dispatch(getOrderDetail(order_token));
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const finalizeOrder = order_token => async dispatch => {
  console.log(order_token);
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`order/finalize/${order_token}`, "PATCH");
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const handleSubmitAPaymentInLord = (order_token, body = {}) => async dispatch => {
  console.log(order_token);
  console.log(body);
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`payment/web/${order_token}`, "POST", body);
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
    console.log(payload);
    return payload;
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
