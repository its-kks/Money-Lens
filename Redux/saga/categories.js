import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
  addCategorynFailure,
  addCategorySuccess,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure



} from '../actions/categories';
import { FETCH_CATEGORIES_REQUEST,
  ADD_CATEGORIES_REQUEST,
  UPDATE_CATEGORIES_REQUEST,
  DELETE_CATEGORIES_REQUEST

 } from '../constants';
import { fetchCategories,
  addCategories,
  updateCategory,
  deleteCategory
 } from '../../sql/dbCategories';

function* fetchCategoriesSaga() {
  try {
    const categories = yield call(fetchCategories);
    yield put(fetchCategoriesSuccess(categories))
  }
  catch (error) {
    yield put(fetchCategoriesFailure(error))
  }
}

export function* watchFetchCategories() {
  yield takeLatest(FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga);
}


function* addCategorySaga(action){
  try{
    const categoryData = action.payload;
    yield call(addCategories, categoryData);
    const categories = yield call(fetchCategories);
    yield put(addCategorySuccess(categories));
  }
  catch(error){
    yield put(addCategorynFailure(error));
  }

}

export function* watchAddCategory(){
  yield takeLatest(ADD_CATEGORIES_REQUEST, addCategorySaga);
}



function* updateCategorySaga(action){
  try{
    const categoryData = action.payload;
    yield call(updateCategory, categoryData);
    const categories = yield call(fetchCategories);
    yield put(updateCategorySuccess(categories));
  }
  catch(error){
    yield put(updateCategoryFailure(error));
  }
}

export function* watcUpdateCategories(){
  yield takeLatest(UPDATE_CATEGORIES_REQUEST,updateCategorySaga);
}


function* deleteCategorySaga(action){
  try{
    const transactionData = action.payload;
    yield call(deleteCategory, transactionData);
    const transactions = yield call(fetchCategories);
    yield put(deleteCategorySuccess(transactions));
  }
  catch(error){
    yield put(deleteCategoryFailure(error));
  }
}

export function* watcDeleteCategories(){
  yield takeLatest(DELETE_CATEGORIES_REQUEST,deleteCategorySaga);
}

