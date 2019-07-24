import { callApi, startLoader, stopLoader } from "./utilities.action";
import { processLogout } from "./auth.action";

export const createNewAddressInstance = (body = {}) => async dispatch => {
  try {
    await startLoader(dispatch);
    const { payload } = await callApi(`address/detail`, "POST", { ...body });
    await stopLoader(dispatch);
    return payload;
  } catch (err) {
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};
