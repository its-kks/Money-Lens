import { call, put, takeLatest } from 'redux-saga/effects';

import {
  FETCH_BAR_DATA_REQUEST,
} from '../constants';

import {
  fetchBarDataSuccess,
  fetchBarDataFailure,
} from '../actions/insightBar';


import { fetchCategoriesBar } from '../../sql/dbCategories';

import { returnLowerMonth, returnLowerYear } from '../../utilities/filters';

function* fetchBarDataSaga(action) {
  try {
    const {categoryID, month, year }  = action.payload;
    const lowerBoundMonth = returnLowerMonth(month).toString().padStart(2, '0');
    const upperBoundMonth = (returnLowerMonth(month) + 2).toString().padStart(2, '0');
    const lowerBoundYear = returnLowerYear(year).toString();
    const upperBoundYear = (returnLowerYear(year) + 2).toString();
    const lowerBoundMonthPrev = (parseInt(lowerBoundMonth) - 1).toString().padStart(2, '0');
    const upperBoundMonthPrev = (parseInt(upperBoundMonth) - 1).toString().padStart(2, '0');
    
    const currentMonth = new Date().getMonth();
    let lowerBoundYearPrev = lowerBoundYear;
    let upperBoundYearPrev = upperBoundYear;

    if ((month === 'This Month' && currentMonth === 0) || month === 'Janurary') {
      lowerBoundYearPrev = (parseInt(lowerBoundYear) - 1).toString();
      upperBoundYearPrev = (parseInt(upperBoundYear) - 1).toString();
    }
    
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