import { call, put, takeLatest } from 'redux-saga/effects';
import {
  addTransactionFailure,
  addTransactionSuccess,
  fetchTransactionSuccess,
  fetchTransactionFailure,
  updateTransactionSuccess,
  updateTransactionFailure,
  deleteTransactionFailure,
  deleteTransactionSuccess

} from '../actions/transactions';
import {
  ADD_TRANSACTION_REQUEST,
  FETCH_TRANSACTIONS_REQUEST,
  UPDATE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_REQUEST
} from '../constants';


import { addTransaction, fetchTransactions, updateTransaction, deleteTransaction } from '../../sql/dbTransactions';

function* addTransactionSaga(action) {
  try {
    const transactionData = action.payload;
    yield call(addTransaction, transactionData);
    const transactions = yield call(fetchTransactions);
    yield put(addTransactionSuccess(transactions));
  }
  catch (error) {
    yield put(addTransactionFailure(error));
  }

}

export function* watchAddTransaction() {
  yield takeLatest(ADD_TRANSACTION_REQUEST, addTransactionSaga);
}

function* fetchTransactionsSaga(action) {
  {/* Filter logic */ }
  const applyFilter = (transactions, type, month, year) => {
    return transactions.filter(transaction => {
      if (type != 'Any') {
        if (transaction.amount > 0 && type == 'Expenditure') {
          return false;
        }
        if (transaction.amount < 0 && type == 'Income') {
          return false;
        }
      }
      const today = new Date();
      const transactionDate = new Date(transaction.tran_date_time);
      if (month == 'This Month') {
        if (transactionDate.getMonth() != today.getMonth()) {
          return false;
        }
      }
      if (month == 'Prev Month') {
        if (transactionDate.getMonth() != (today.getMonth() === 0 ? 11 : today.getMonth() - 1)) {
          return false;
        }
      }
      const monthArr = {
        'January': 0,
        'February': 1,
        'March': 2,
        'April': 3,
        'May': 4,
        'June': 5,
        'July': 6,
        'August': 7,
        'September': 8,
        'October': 9,
        'November': 10,
        'December': 11
      };
      if (month != 'This Month' && month != 'Prev Month') {
        if (transactionDate.getMonth() != monthArr[month]) {
          return false;
        }
      }
      if (year == 'This Year') {
        if (transactionDate.getFullYear() != today.getFullYear()) {
          return false;
        }
      }
      if (year == 'Prev Year') {
        if (transactionDate.getFullYear() != today.getFullYear() - 1) {
          return false;
        }
      }
      return true;
    });
  };
  try {
    const { type, month, year } = action.payload;
    const transactions = yield call(fetchTransactions);
    const filteredTransactions = applyFilter(transactions, type, month, year);
    yield put(fetchTransactionSuccess(filteredTransactions));
  }
  catch (error) {
    yield put(fetchTransactionFailure(error));
  }
}



export function* watchFetchTransactions() {
  yield takeLatest(FETCH_TRANSACTIONS_REQUEST, fetchTransactionsSaga);
}


function* updateTransactionSaga(action) {
  try {
    const transactionData = action.payload;
    yield call(updateTransaction, transactionData);
    const transactions = yield call(fetchTransactions);
    yield put(updateTransactionSuccess(transactions));
  }
  catch (error) {
    yield put(updateTransactionFailure(error));
  }
}

export function* watcUpdateTransactions() {
  yield takeLatest(UPDATE_TRANSACTION_REQUEST, updateTransactionSaga);
}

function* deleteTransactionSaga(action) {
  try {
    const id = action.payload;
    yield call(deleteTransaction, id);
    const transactions = yield call(fetchTransactions);
    yield put(deleteTransactionSuccess(transactions));
  }
  catch (error) {
    yield put(deleteTransactionFailure(error));
  }
}

export function* watcDeleteTransactions() {
  yield takeLatest(DELETE_TRANSACTION_REQUEST, deleteTransactionSaga);
}

// [{"amount": -88, "backgroundColor": "purple", "category": "Miscellaneous", "category_id": 1, "icon": "❓", "id": 2, "name": "Neome", "recipient": "Unknown", "recipient_id": 1, "tran_date_time": "2024-08-28 16:34:33"}, {"amount": 885555, "backgroundColor": "purple", "category": "Miscellaneous", "category_id": 1, "icon": "❓", "id": 1, "name": "Hello", "recipient": "Unknown", "recipient_id": 1, "tran_date_time": "2024-08-28 16:20:54"}]