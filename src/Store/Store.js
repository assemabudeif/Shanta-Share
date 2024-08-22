import {applyMiddleware, createStore} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import combineReducers from "./Reducers/combineReducers";

const Store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)))

export default Store;