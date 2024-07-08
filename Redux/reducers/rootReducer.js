import { combineReducers } from "redux";
import categoryReducer from './categories';
import recipientReducer from "./recipients";
import transactionReducer from "./transactions";

const rootReducer = combineReducers(
  {
    categories: categoryReducer,
    recipients: recipientReducer,
    transactions: transactionReducer,
  }

)

export default rootReducer;