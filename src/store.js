import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import locationReducer from "./reducers/location.reducer";
import contactReducer from "./reducers/contact.reducer";
import orderReducer from "./reducers/order.reducer";
import loadReducer from "./reducers/load.reducer";

const store = createStore(
  combineReducers({ loadReducer, locationReducer, contactReducer, orderReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
