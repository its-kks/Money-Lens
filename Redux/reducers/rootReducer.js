import { combineReducers } from "redux";
import categoryReducer from './categories';
import recipientReducer from "./recipients";

const rootReducer = combineReducers(
  {
    categories: categoryReducer,
    recipients: recipientReducer
  }

)

export default rootReducer;