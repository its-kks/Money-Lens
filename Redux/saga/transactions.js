import {call, put , takeLatest} from 'redux-saga/effects';
import { addTransactionFailure, addTransactionSuccess } from '../actions/transactions';
import { ADD_TRANSACTION_REQUEST } from '../constants';
import {addTransaction} from '../../sql/dbTransactions';

function* addTransactionSaga(action){
  try{
    const transactionData = action.payload;
    yield call(addTransaction, transactionData);
    yield put(addTransactionSuccess(transactionData));
  }
  catch(error){
    yield put(addTransactionFailure(error));
  }

}

function* watchAddTransaction(){
  yield takeLatest(ADD_TRANSACTION_REQUEST, addTransactionSaga);
}

export default watchAddTransaction;