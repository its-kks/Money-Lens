import { combineReducers } from "redux";
import categoryReducer from './categories';
import recipientReducer from "./recipients";
import transactionReducer from "./transactions";
import userReducer from "./users";
import recurringPaymentsReducer from './recurringPayments';
import savingsReducer from "./savings";
import actionReducer from "./actions";
import insightBarReducer from "./insightBar";
import insightPieReducer from "./insightPie";

const rootReducer = combineReducers(
  {
    categories: categoryReducer,
    recipients: recipientReducer,
    transactions: transactionReducer,
    users: userReducer,
    recurringPayments: recurringPaymentsReducer,
    savings: savingsReducer,
    actions: actionReducer,
    insightBar: insightBarReducer,
    insightPie: insightPieReducer,
  }

)

export default rootReducer;