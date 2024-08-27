import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchActionsFailure,
  fetchActionsSuccess,
  addActionFailure,
  addActionSuccess,
  deleteActionFailure,
  deleteActionSuccess

} from '../actions/actions';

import {
  FETCH_ACTIONS_REQUEST,
  ADD_ACTIONS_REQUEST,
  DELETE_ACTIONS_REQUEST,
} from '../constants';

import {
  fetchActions,
  deleteActions,
  addActions

} from '../../sql/dbActions';

function* addActionSaga(action) {
  try {
    const actionData = action.payload;
    yield call(addActions, actionData);
    const actions = yield call(fetchActions);
    yield put(addActionSuccess, actions);
  }
  catch (error) {
    yield put(addActionFailure, error);
  }
}

export function* watchAddActions() {
  yield takeLatest(ADD_ACTIONS_REQUEST, addActionSaga);
}

function* fetchActionSaga() {
  try {
    const actions = yield call(fetchActions);
    yield put(fetchActionsSuccess, actions);
  }
  catch (error) {
    yield put(fetchActionsFailure, error);
  }
}

export function* watchFetchActions() {
  yield takeLatest(FETCH_ACTIONS_REQUEST, fetchActionSaga);
}

export function* deleteActionSaga(action) {
  try {
    const id = action.payload;
    yield call(deleteActions, id);
    const actions = yield call(fetchActions);
    yield put(deleteActionSuccess(actions));
  }
  catch (error) {
    yield put(deleteActionFailure(error));
  }
}

export function* watchDeleteActions() {
  yield takeLatest(DELETE_ACTIONS_REQUEST, deleteActionSaga);
}

