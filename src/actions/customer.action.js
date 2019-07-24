import constant from "../constant/constant";
import { callApi, startLoader, stopLoader, launchSuccess } from "./utilities.action";
import { processLogout } from "./auth.action";
import { processLogin } from "../actions/auth.action";
export const createACustomerIn = (body = {}, history) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`customer/detail/REALM-e775d5ca14bd440e244ea374c1f57fc5`, "POST", body);
    console.log(payload);
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
