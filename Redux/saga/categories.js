import {call, put, takeLatest} from 'redux-saga/effects';
import { fetchCategoriesFailure, fetchCategoriesSuccess } from '../actions/categories';
import { FETCH_CATEGORIES_REQUEST } from '../constants';
import {fetchCategories} from '../../sql/dbCategories';

function* fetchCategoriesSaga() {
    try {
      const categories = yield call(fetchCategories);
      yield put(fetchCategoriesSuccess(categories))
    }
    catch(error){
      yield put(fetchCategoriesFailure(error))
    }
}

function* watchFetchCategories(){
  yield takeLatest(FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga);
}


export default watchFetchCategories;