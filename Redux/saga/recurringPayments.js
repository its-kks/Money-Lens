import { pass, takeLatest, call, put } from 'redux-saga/effects';
import {
  fetchRecurringPaymentsSuccess,
  fetchRecurringPaymentsFailure,
  addRecurringPaymentFailure,
  addRecurringPaymentSuccess,
  updateRecurringPaymentFailure,
  updateRecurringPaymentSuccess,
  deleteRecurringPaymentFailure,
  deleteRecurringPaymentSuccess,
}
  from '../actions/recurringPayments';


import {
  addRecurringPayments,
  deleteRecurringPayments,
  fetchRecurringPayments,
  updateRecurringPayments
} from '../../sql/dbRecurringPayments';

import {
  FETCH_RECURRING_PAYMENTS_REQUEST,
  ADD_RECURRING_PAYMENT_REQUEST,
  UPDATE_RECURRING_PAYMENT_REQUEST,
  DELETE_RECURRING_PAYMENT_REQUEST
}
  from '../constants';


// fetch
function* fetchRecurringPaymentsSaga() {
  try {
    const recurringPayments = yield call(fetchRecurringPayments);
    yield put(fetchRecurringPaymentsSuccess(recurringPayments));
  }
  catch (error) {
    yield put(fetchRecurringPaymentsFailure(error));
  }
}

export function* watchFetchRecurringPayments() {
  yield takeLatest(FETCH_RECURRING_PAYMENTS_REQUEST, fetchRecurringPaymentsSaga);
}

// add
function* addRecurringPaymentSaga(action) { 
  try {
    const recPaymentData = action.payload;
    yield call(addRecurringPayments, recPaymentData);
    const recurringPayments = yield call(fetchRecurringPayments);
    yield put(addRecurringPaymentSuccess(recurringPayments));
  }
  catch (error) {
    yield put(addRecurringPaymentFailure(error));
  }
}

export function* watchAddRecurringPayment() {
  yield takeLatest(ADD_RECURRING_PAYMENT_REQUEST, addRecurringPaymentSaga);
}

// update
function* updateRecurringPaymentSaga(action){
  try{
    // ID Receiving checked
    const recPaymentData = action.payload;
    yield call(updateRecurringPayments,recPaymentData);
    const recurringPayments = yield call(fetchRecurringPayments);
    yield put(updateRecurringPaymentSuccess(recurringPayments));
  }
  catch(error){
    yield put(updateRecurringPaymentFailure(error));
  }
}

export function* watchUpdateRecurringPayment() {
  yield takeLatest(UPDATE_RECURRING_PAYMENT_REQUEST,updateRecurringPaymentSaga);
}

/// delete
export function* deleteRecurringPaymentSaga(action){
  try{
    const recPaymentID = action.payload;
    yield call(deleteRecurringPayments,recPaymentID);
    const recurringPayments = yield call(fetchRecurringPayments);
    yield put(deleteRecurringPaymentSuccess(recurringPayments));
  }
  catch(error){
    yield put(deleteRecurringPaymentFailure(error));
  }
}

export function* watchDeleteRecurringPayment(){
  yield takeLatest(DELETE_RECURRING_PAYMENT_REQUEST,deleteRecurringPaymentSaga);
}