import { call, put, takeLatest } from 'redux-saga/effects';

import {
  FETCH_BAR_DATA_REQUEST,
} from '../constants';

import {
  fetchBarDataSuccess,
  fetchBarDataFailure,
} from '../actions/insightBar';


import { fetchCategoriesBar } from '../../sql/dbCategories';

import { returnUpperAmount, returnLowerAmount, returnLowerMonth, returnLowerYear } from '../../utilities/filters';

function* fetchBarDataSaga(action) {
  try {
    const {type, month, year }  = action.payload;
    const lowerBoundAmount = returnLowerAmount(type);
    const upperBoundAmount = returnUpperAmount(type);
    const lowerBoundMonth = returnLowerMonth(month).toString().padStart(2, '0');
    const upperBoundMonth = (returnLowerMonth(month) + 2).toString().padStart(2, '0');
    const lowerBoundYear = returnLowerYear(year).toString();
    const upperBoundYear = (returnLowerYear(year) + 2).toString();
    const data = yield call(fetchCategoriesBar, {lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear ,upperBoundYear});
    yield put(fetchBarDataSuccess(data));
  } catch (error) {
    yield put(fetchBarDataFailure(error));
  }
}

function* watchInsightBarSaga() {
  yield takeLatest(FETCH_BAR_DATA_REQUEST, fetchBarDataSaga);
}

export default watchInsightBarSaga;