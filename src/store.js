import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import contactReducer from "./reducers/contact.reducer";
import orderReducer from "./reducers/order.reducer";
import loadReducer from "./reducers/load.reducer";
import userReducer from "./reducers/user.reducer";
import localReducer from "./reducers/local.reducer";
import authReducer from "./reducers/auth.reducer";
const store = createStore(
  combineReducers({ loadReducer, contactReducer, orderReducer, userReducer, localReducer, authReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
