import { call, put, takeLatest } from 'redux-saga/effects';

import {
  FETCH_SAVINGS_REQUEST,
  ADD_SAVINGS_REQUEST,
  UPDATE_SAVINGS_REQUEST,
  DELETE_SAVINGS_REQUEST
} from '../constants';

import {
  fetchSavingsFailure,
  fetchSavingsSuccess,
  addSavingsFailure,
  addSavingsSuccess,
  updateSavingsSuccess,
  updateSavingsFailure,
  deleteSavingsSuccess,
  deleteSavingsFailure
} from '../actions/savings';

import {
  fetchSavings,
  addSavings,
  updateSaving,
  deleteSaving
} from '../../sql/dbSavings';

function* fetchSavingsSaga(){
  try{
    const savings = yield call(fetchSavings);
    yield put(fetchSavingsSuccess(savings));
  }
  catch (error){
    yield put(fetchSavingsFailure(error));
  }
}

export function* watchFetchSavings(){
  yield takeLatest(FETCH_SAVINGS_REQUEST, fetchSavingsSaga);
}

function* addSavingsSaga(action){
  try{
    const savings = yield call(addSavings, action.payload);
    yield put(addSavingsSuccess(savings));
  }
  catch (error){
    yield put(addSavingsFailure(error));
  }
}

export function* watchAddSavings(){
  yield takeLatest(ADD_SAVINGS_REQUEST, addSavingsSaga);
}

function* updateSavingsSaga(action){
  try{
    const savings = yield call(updateSaving, action.payload);
    yield put(updateSavingsSuccess(savings));
  }
  catch (error){
    yield put(updateSavingsFailure(error));
  }
}

export function* watchUpdateSavings(){
  yield takeLatest(UPDATE_SAVINGS_REQUEST, updateSavingsSaga);
}

function* deleteSavingsSaga(action){
  try{
    yield call(deleteSaving, action.payload);
    const savings = yield call(fetchSavings);
    yield put(deleteSavingsSuccess(savings));
  }
  catch (error){
    yield put(deleteSavingsFailure(error));
  }
}

export function* watchDeleteSavings(){
  yield takeLatest(DELETE_SAVINGS_REQUEST, deleteSavingsSaga);
}