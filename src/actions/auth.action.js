import { saveUserInfo, clearUserInfo, loadUserInfo } from "./localStorage.action";
import { callApi } from "./utilities.action";
import constant from "../constant/constant";
import alertify from "alertifyjs";

// export const findAuthNumsWithBD = async () => {
//   try {
//     const resp = await callBotDetectionServer('bot/new', 'POST', {}, {});
//     return resp;
//   } catch (err) {
//     alertify.alert('ERROR', err.message || err)
//   }
// }

// export const findPrivateKeyWithBD = async (magic_num) => {
//   try {
//     const resp = await callBotDetectionServer('crypt/private-key', 'GET', null, null, { magic_num });
//     return resp;
//   }
//   catch (err) {
//     alertify.alert('ERROR', err.message || err)
//   }

// }

// export const verifyAuthAnsWithBD = async (body) => {
//   try {
//     const resp = await callBotDetectionServer(`bot/verify/${body.magic_num}`, 'POST', { ans: body.ans })
//     return resp;
//   } catch (err) {
//     alertify.alert('ERROR', err.message || err)
//   }
// }

export const resetPassword = username => async dispatch => {
  try {
    // await startLoader(dispatch)
    const data = await callApi("forget", "POST", { username });
    if (data.status === false) {
      throw new Error(data.message);
    }
    // await stopLoader(dispatch)
    return data.status;
  } catch (error) {
    // await stopLoader(dispatch)
  }
};

export const processLogin = (user_login_nfo, history) => async dispatch => {
  clearUserInfo();
  try {
    await startLoader(dispatch);
    const { payload, verify_info } = await callApi("login", "POST", user_login_nfo);
    saveUserInfo({ ...payload, ...verify_info });
    await await dispatch({
      type: constant.CURRENT_USER,
      payload: payload.verify_info
    });
    await dispatch(loginSuccess());
    await stopLoader(dispatch);
    history.push("/order");
  } catch (err) {
    console.log(err);
    await stopLoader(dispatch);
    dispatch(processLogout(err));
  }
};

export const processLogout = rawError => async dispatch => {
  const err = rawError.message || rawError;
  if (processLogout.fired) return;
  processLogout.fired = true;
  setTimeout(() => (processLogout.fired = false), 2000);
  if (
    err.includes("USER_TOKEN EXPIRED") ||
    err.includes("USER_TOKEN NOT FOUND IN APP") ||
    err.includes("CANNOT FIND VALID TOKEN") ||
    err.includes("TOKEN EXPIRED")
  ) {
    alertify.alert("LOGIN MESSAGE", "YOUR SESSION HAS EXPIRED.");
    dispatch(logoutFromSystem());
  } else if (err.includes("USERNAME NOT FOUND")) {
    alertify.alert("LOGIN MESSAGE", "用户名不正确");
  } else if (err.includes("PASS")) {
    alertify.alert("LOGIN MESSAGE", "密码输入错误");
  } else if (err.includes("Logging out")) {
    dispatch(logoutFromSystem());
  } else {
    alertify.alert("ERROR MESSAGE", err.message || err);
  }
};

export const logoutFromSystem = () => async dispatch => {
  try {
    const user_token = loadUserInfo("user_token");
    if (user_token) {
      const username = loadUserInfo("username");
      callApi("logout", "POST", { username });
      clearUserInfo();
      dispatch(logoutSuccess());
      window.location.href = window.location.origin;
    }
  } catch (err) {
    console.log(err);
    window.location.href = window.location.origin;
  }
};

export const LOGINSUCCESS = "LOGINSUCCESS";
export const loginSuccess = () => ({
  type: LOGINSUCCESS
});

export const LOGOUTSUCCESS = "LOGOUTSUCCESS";
export const logoutSuccess = () => ({
  type: LOGOUTSUCCESS
});

const startLoader = dispatch => {
  dispatch({
    type: constant.START_LOADING
  });
};

const stopLoader = dispatch => {
  dispatch({
    type: constant.STOP_LOADING
  });
};

// const launchSuccess = async dispatch => {
//   await dispatch({
//     type: constant.START_SUCCESS
//   });
//   setTimeout(() => {
//     dispatch({
//       type: constant.STOP_SUCCESS
//     });
//   }, 1000);
// };
