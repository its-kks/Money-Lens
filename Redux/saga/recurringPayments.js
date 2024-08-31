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

const returnFrequencyUpperLimit = (frequency) => {
  if (frequency == 'All') {
    return 999999999999999;
  }
  else if (frequency == 'Monthly') {
    return 2;
  }
  else if (frequency == 'Quaterly') {
    return 5;
  }
  else if (frequency == 'Yearly') {
    return 13;
  }
}

const returnFrequencyLowerLimit = (frequency) => {
  if (frequency == 'All') {
    return 0;
  }
  else if (frequency == 'Monthly') {
    return 0;
  }
  else if (frequency == 'Quaterly') {
    return 3;
  }
  else if (frequency == 'Yearly') {
    return 11;
  }
}

const amountUpperLimit = (type) => {
  if (type == 'Any') {
    return 999999999999999;
  }
  else if (type == 'Income') {
    return 999999999999999;
  }
  else if (type == 'Expenditure') {
    return 0;
  }
}

const amountLowerLimit = (type) => {
  if (type == 'Any') {
    return -999999999999999;
  }
  else if (type == 'Income') {
    return 0;
  }
  else if (type == 'Expenditure') {
    return -999999999999999;
  }
}

// fetch
function* fetchRecurringPaymentsSaga(action) {
  try {
    const { type, frequency, sort } = action.payload;
    const amountLower = amountLowerLimit(type);
    const amountUpper = amountUpperLimit(type);
    const frequencyUpper = returnFrequencyUpperLimit(frequency);
    const frequencyLower = returnFrequencyLowerLimit(frequency);
    const recurringPayments = yield call(fetchRecurringPayments, { amountLower, amountUpper, frequencyUpper, frequencyLower, sort });
    yield put(fetchRecurringPaymentsSuccess(recurringPayments));
  } catch (error) {
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
    const { type, frequency, sort } = { type: 'Any', frequency: 'All', sort: 'desc' };
    const amountLower = amountLowerLimit(type);
    const amountUpper = amountUpperLimit(type);
    const frequencyUpper = returnFrequencyUpperLimit(frequency);
    const frequencyLower = returnFrequencyLowerLimit(frequency);
    const recurringPayments = yield call(fetchRecurringPayments, { amountLower, amountUpper, frequencyUpper, frequencyLower , sort});
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
function* updateRecurringPaymentSaga(action) {
  try {
    // ID Receiving checked
    const recPaymentData = action.payload;
    yield call(updateRecurringPayments, recPaymentData);
    const { type, frequency, sort } = { type: 'Any', frequency: 'All', sort: 'desc' };
    const amountLower = amountLowerLimit(type);
    const amountUpper = amountUpperLimit(type);
    const frequencyUpper = returnFrequencyUpperLimit(frequency);
    const frequencyLower = returnFrequencyLowerLimit(frequency);
    const recurringPayments = yield call(fetchRecurringPayments, { amountLower, amountUpper, frequencyUpper, frequencyLower , sort});
    yield put(updateRecurringPaymentSuccess(recurringPayments));
  }
  catch (error) {
    yield put(updateRecurringPaymentFailure(error));
  }
}

export function* watchUpdateRecurringPayment() {
  yield takeLatest(UPDATE_RECURRING_PAYMENT_REQUEST, updateRecurringPaymentSaga);
}

/// delete
export function* deleteRecurringPaymentSaga(action) {
  try {
    const recPaymentID = action.payload;
    yield call(deleteRecurringPayments, recPaymentID);
    const { type, frequency, sort } = { type: 'Any', frequency: 'All', sort: 'desc' };
    const amountLower = amountLowerLimit(type);
    const amountUpper = amountUpperLimit(type);
    const frequencyUpper = returnFrequencyUpperLimit(frequency);
    const frequencyLower = returnFrequencyLowerLimit(frequency);
    const recurringPayments = yield call(fetchRecurringPayments, { amountLower, amountUpper, frequencyUpper, frequencyLower , sort});
    yield put(deleteRecurringPaymentSuccess(recurringPayments));
  }
  catch (error) {
    yield put(deleteRecurringPaymentFailure(error));
  }
}

export function* watchDeleteRecurringPayment() {
  yield takeLatest(DELETE_RECURRING_PAYMENT_REQUEST, deleteRecurringPaymentSaga);
}