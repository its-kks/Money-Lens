import { FETCH_CURRENT_MONTH_MONEY_REQUEST } from "../constants";
import { put, takeLatest , call} from 'redux-saga/effects';
import { fetchCurrentMonthMoneySuccess, fetchCurrentMonthMoneyFailure } from '../actions/users';
import { fetchMonthMoney } from "../../sql/dbUser";

function* fetchCurrentMonthMoney() {
  try {
    const response = yield call(fetchMonthMoney);
    yield put(fetchCurrentMonthMoneySuccess(response));
  } catch (error) {
    yield put(fetchCurrentMonthMoneyFailure(error));
  }
}

export function* watchFetchCurrentMonthMoney() {
  yield takeLatest(FETCH_CURRENT_MONTH_MONEY_REQUEST, fetchCurrentMonthMoney);
}