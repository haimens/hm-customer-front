import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";
import { processLogin } from "../actions/auth.action";
export const createACustomerIn = (body = {}, history) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`customer/detail/${process.env.REACT_APP_REALM_TOKEN}`, "POST", body);
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
    await dispatch(
      processLogin(
        {
          username: payload.username,
          passcode: payload.username
        },
        history
      )
    );
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const createCustomerNote = (order_token, body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    await callApi(`note/detail/order/${order_token}`, "POST", body);
    await launchSuccess(dispatch);
    await stopLoader(dispatch);
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
