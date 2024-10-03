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
    const {categoryID, month, year }  = action.payload;
    const lowerBoundMonth = returnLowerMonth(month).toString().padStart(2, '0');
    const upperBoundMonth = (returnLowerMonth(month) + 2).toString().padStart(2, '0');
    const lowerBoundYear = returnLowerYear(year).toString();
    const upperBoundYear = (returnLowerYear(year) + 2).toString();
    const lowerBoundMonthPrev = returnLowerMonth(month-1).toString().padStart(2, '0');
    const upperBoundMonthPrev = (returnLowerMonth(month-1) + 2).toString().padStart(2, '0');
    const lowerBoundYearPrev = returnLowerYear(year-1).toString();
    const upperBoundYearPrev = (returnLowerYear(year-1) + 2).toString();
    const data = yield call(fetchCategoriesBar, {categoryID, lowerBoundMonth, upperBoundMonth, lowerBoundYear ,upperBoundYear,
      lowerBoundMonthPrev, upperBoundMonthPrev, lowerBoundYearPrev ,upperBoundYearPrev});
    yield put(fetchBarDataSuccess(data));
  } catch (error) {
    yield put(fetchBarDataFailure(error));
  }
}

function* watchInsightBarSaga() {
  yield takeLatest(FETCH_BAR_DATA_REQUEST, fetchBarDataSaga);
}

export default watchInsightBarSaga;