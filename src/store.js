import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import locationReducer from "./reducers/location.container";
const store = createStore(combineReducers({ locationReducer }), composeWithDevTools(applyMiddleware(thunk)));
export default store;
