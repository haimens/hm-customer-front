import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import locationReducer from "./reducers/location.container";
import contactReducer from "./reducers/contact.container";

const store = createStore(
  combineReducers({ locationReducer, contactReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
