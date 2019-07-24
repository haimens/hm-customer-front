export const loadUserInfo = type => {
  try {
    let temp = localStorage.getItem(type);
    return temp;
  } catch (e) {
    console.log("loadAuthToken error");
    throw e;
  }
};

export const saveUserInfo = user_info => {
  try {
    console.log(user_info);
    const { instance_token, user_token, username, customer_token } = user_info;
    localStorage.setItem("instance_token", instance_token);
    localStorage.setItem("user_token", user_token);
    localStorage.setItem("username", username);
    localStorage.setItem("customer_token", customer_token);
  } catch (e) {
    console.log("save auth token error");
    throw e;
  }
};

export const clearUserInfo = () => {
  try {
    localStorage.clear();
  } catch (e) {
    console.log("remove user error");
    throw e;
  }
};
