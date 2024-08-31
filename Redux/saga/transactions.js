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

const returnLowerAmount = (type) => {
  switch (type) {
    case 'Any':
      return -999999999999999;
    case 'Income':
      return 0;
    case 'Expenditure':
      return -999999999999999;
    default:
      return 0;
  }
}
const returnUpperAmount = (type) => {
  switch (type) {
    case 'Any':
      return 999999999999999;
    case 'Income':
      return 999999999999999;
    case 'Expenditure':
      return 0;
    default:
      return 0;
  }
}

const returnLowerMonth = (month) => {
  const date = new Date();
  switch (month) {
    case 'This Month':
      return date.getMonth();
    case 'Prev Month':
      if (date.getMonth() == 0) {
        return 11;
      }
      else{
        return date.getMonth() - 1;
      }
    case 'Janurary':
      return 0;
    case 'Feburary':
      return 1;
    case 'March':
      return 2;
    case 'April':
      return 3;
    case 'May':
      return 4;
    case 'June':
      return 5;
    case 'July':
      return 6;
    case 'August':
      return 7;
    case 'September':
      return 8;
    case 'October':
      return 9;
    case 'November':
      return 10;
    case 'December':
      return 11;
    default:
      return 0;
  }
}

const returnLowerYear = (year) => {
  const date = new Date();
  switch (year) {
    case 'This Year':
      return date.getFullYear() - 1;
    case 'Prev Year':
      return date.getFullYear() - 2;
    default:
      return 0;
  }
}


function* addTransactionSaga(action) {
  try {
    const transactionData = action.payload;
    yield call(addTransaction, transactionData);
    const { type, month, year, sort } = { type: 'Any', month: 'This Month', year: 'This Year', sort: 'desc' };
    const lowerBoundAmount = returnLowerAmount(type);
    const upperBoundAmount = returnUpperAmount(type);
    const lowerBoundMonth = returnLowerMonth(month).toString().padStart(2, '0');
    const upperBoundMonth = (returnLowerMonth(month) + 2).toString().padStart(2, '0');
    const lowerBoundYear = returnLowerYear(year).toString();
    const upperBoundYear = (returnLowerYear(year) + 2).toString();
    const transactions = yield call(fetchTransactions, { lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear, upperBoundYear, sort });
    console.log(transactions, { lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear, upperBoundYear, sort });
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
  try {
    const { type, month, year, sort } = action.payload;
    const lowerBoundAmount = returnLowerAmount(type);
    const upperBoundAmount = returnUpperAmount(type);
    const lowerBoundMonth = returnLowerMonth(month).toString().padStart(2, '0');
    const upperBoundMonth = (returnLowerMonth(month) + 2).toString().padStart(2, '0');
    const lowerBoundYear = returnLowerYear(year).toString();
    const upperBoundYear = (returnLowerYear(year) + 2).toString();
    const transactions = yield call(fetchTransactions, { lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear, upperBoundYear, sort });
    yield put(fetchTransactionSuccess(transactions));
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
    const { type, month, year, sort } = { type: 'Any', month: 'This Month', year: 'This Year', sort: 'desc' };
    const lowerBoundAmount = returnLowerAmount(type);
    const upperBoundAmount = returnUpperAmount(type);
    const lowerBoundMonth = returnLowerMonth(month).toString().padStart(2, '0');
    const upperBoundMonth = (returnLowerMonth(month) + 2).toString().padStart(2, '0');
    const lowerBoundYear = returnLowerYear(year).toString();
    const upperBoundYear = (returnLowerYear(year) + 2).toString();
    const transactions = yield call(fetchTransactions, { lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear, upperBoundYear, sort });
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
    const { type, month, year, sort } = { type: 'Any', month: 'This Month', year: 'This Year', sort: 'desc' };
    const lowerBoundAmount = returnLowerAmount(type);
    const upperBoundAmount = returnUpperAmount(type);
    const lowerBoundMonth = returnLowerMonth(month).toString().padStart(2, '0');
    const upperBoundMonth = (returnLowerMonth(month) + 2).toString().padStart(2, '0');
    const lowerBoundYear = returnLowerYear(year).toString();
    const upperBoundYear = (returnLowerYear(year) + 2).toString();
    const transactions = yield call(fetchTransactions, { lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear, upperBoundYear, sort });
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