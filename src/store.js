import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import contactReducer from "./reducers/contact.reducer";
import orderReducer from "./reducers/order.reducer";
import loadReducer from "./reducers/load.reducer";

const store = createStore(
  combineReducers({ loadReducer, contactReducer, orderReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
