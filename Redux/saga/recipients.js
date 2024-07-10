import { pass, takeLatest, call, put } from 'redux-saga/effects';
import {
  fetchRecipientsSuccess,
  fetchRecipientsFailure,
  addRecipientFailure,
  addRecipientSuccess,
  updateRecipientFailure,
  updateRecipientSuccess,
  deleteRecipientFailure,
  deleteRecipientSuccess,
}
  from '../actions/recipients';
import { fetchRecipients
  , addRecipient
  , deleteRecipient
  ,updateRecipient
 } from '../../sql/dbRecipients';
import { FETCH_RECIPIENTS_REQUEST,

  ADD_RECIPIENTS_REQUEST,
  UPDATE_RECIPIENTS_REQUEST,
  DELETE_RECIPIENTS_REQUEST
 } from '../constants';


function* fetchRecipientsSaga() {
  try {
    const recipients = yield call(fetchRecipients);
    yield put(fetchRecipientsSuccess(recipients));
  }
  catch (error) {
    yield put(fetchRecipientsFailure(error));
  }
}

export function* watchFetchRecipients() {
  yield takeLatest(FETCH_RECIPIENTS_REQUEST, fetchRecipientsSaga);
}



// ADD
function* addRecipientSaga({ payload }) {
  try{
    yield call(addRecipient, payload);
    const recipients = yield call(fetchRecipients);
    yield put(addRecipientSuccess(recipients));
  }
  catch(error){
    yield put(addRecipientFailure(error));
  }
}

export function* watchAddRecipient() {
  yield takeLatest(ADD_RECIPIENTS_REQUEST, addRecipientSaga);
}

// UPDATE

function* updateRecipientSaga({ payload }) {
  try{
    yield call(updateRecipient, payload);
    const recipients = yield call(fetchRecipients);
    yield put(updateRecipientSuccess(recipients));
  }
  catch(error){
    yield put(updateRecipientFailure(error));
  }
}

export function* watchUpdateRecipient() {
  yield takeLatest(UPDATE_RECIPIENTS_REQUEST, updateRecipientSaga);
}

// DELETE

function* deleteRecipientSaga({ payload }) {
  try{
    yield call(deleteRecipient, payload);
    const recipients = yield call(fetchRecipients);
    yield put(deleteRecipientSuccess(recipients));
  }
  catch(error){
    yield put(deleteRecipientFailure(error));
  }
}

export function* watchDeleteRecipient() {
  yield takeLatest(DELETE_RECIPIENTS_REQUEST, deleteRecipientSaga);
}