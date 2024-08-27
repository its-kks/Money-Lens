import {call, put , takeLatest} from 'redux-saga/effects';
import { addTransactionFailure, 
  addTransactionSuccess,
  fetchTransactionSuccess,
  fetchTransactionFailure,
  updateTransactionSuccess,
  updateTransactionFailure,
  deleteTransactionFailure,
  deleteTransactionSuccess
  
 } from '../actions/transactions';
import { ADD_TRANSACTION_REQUEST, 
  FETCH_TRANSACTIONS_REQUEST,
  UPDATE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_REQUEST
} from '../constants';


import {addTransaction, fetchTransactions, updateTransaction, deleteTransaction} from '../../sql/dbTransactions';

function* addTransactionSaga(action){
  try{
    const transactionData = action.payload;
    yield call(addTransaction, transactionData);
    const transactions = yield call(fetchTransactions);
    yield put(addTransactionSuccess(transactions));
  }
  catch(error){
    yield put(addTransactionFailure(error));
  }

}

export function* watchAddTransaction(){
  yield takeLatest(ADD_TRANSACTION_REQUEST, addTransactionSaga);
}

function* fetchTransactionsSaga(){
  try{
    const transactions = yield call(fetchTransactions);
    yield put(fetchTransactionSuccess(transactions));
  }
  catch(error){
    yield put(fetchTransactionFailure(error));
  }
}



export function* watchFetchTransactions(){
  yield takeLatest(FETCH_TRANSACTIONS_REQUEST, fetchTransactionsSaga);
}


function* updateTransactionSaga(action){
  try{
    const transactionData = action.payload;
    yield call(updateTransaction, transactionData);
    const transactions = yield call(fetchTransactions);
    yield put(updateTransactionSuccess(transactions));
  }
  catch(error){
    yield put(updateTransactionFailure(error));
  }
}

export function* watcUpdateTransactions(){
  yield takeLatest(UPDATE_TRANSACTION_REQUEST,updateTransactionSaga);
}

function* deleteTransactionSaga(action){
  try{
    const id = action.payload;
    yield call(deleteTransaction, id);
    const transactions = yield call(fetchTransactions);
    yield put(deleteTransactionSuccess(transactions));
  }
  catch(error){
    yield put(deleteTransactionFailure(error));
  }
}

export function* watcDeleteTransactions(){
  yield takeLatest(DELETE_TRANSACTION_REQUEST,deleteTransactionSaga);
}