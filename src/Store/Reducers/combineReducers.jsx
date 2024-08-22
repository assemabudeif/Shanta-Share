import { combineReducers } from "redux";
import LoaderReducer from "./LoaderReducer";

export default combineReducers({
    loader: LoaderReducer,
})