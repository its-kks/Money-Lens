import { call, put , takeLatest } from 'redux-saga/effects';
import { FETCH_PIE_DATA_REQUEST } from '../constants';

import { fetchPieDataSuccess, fetchPieDataFailure } from '../actions/insightPie';

import { fetchCategoriesPie } from '../../sql/dbCategories';
import { returnLowerAmount, returnLowerMonth, returnUpperAmount, returnLowerYear } from '../../utilities/filters';


function* fetchPieDataSaga(action) {
  try {
    const {type, month, year }  = action.payload;
    const lowerBoundAmount = returnLowerAmount(type);
    const upperBoundAmount = returnUpperAmount(type);
    const lowerBoundMonth = returnLowerMonth(month).toString().padStart(2, '0');
    const upperBoundMonth = (returnLowerMonth(month) + 2).toString().padStart(2, '0');
    const lowerBoundYear = returnLowerYear(year).toString();
    const upperBoundYear = (returnLowerYear(year) + 2).toString();
    const data = yield call(fetchCategoriesPie, {lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear ,upperBoundYear});
    yield put(fetchPieDataSuccess(data));
  } catch (error) {
    yield put(fetchPieDataFailure(error));
  }
}

function* watchInsightPieSaga() {
  yield takeLatest(FETCH_PIE_DATA_REQUEST, fetchPieDataSaga);
}

export default watchInsightPieSaga;