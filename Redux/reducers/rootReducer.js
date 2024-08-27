import { combineReducers } from "redux";
import categoryReducer from './categories';
import recipientReducer from "./recipients";
import transactionReducer from "./transactions";
import userReducer from "./users";
import recurringPaymentsReducer from './recurringPayments';
import savingsReducer from "./savings";
import actionReducer from "./actions";

const rootReducer = combineReducers(
  {
    categories: categoryReducer,
    recipients: recipientReducer,
    transactions: transactionReducer,
    users: userReducer,
    recurringPayments: recurringPaymentsReducer,
    savings: savingsReducer,
    actions: actionReducer
  }

)

export default rootReducer;