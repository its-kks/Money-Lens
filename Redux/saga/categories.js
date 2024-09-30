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

import { returnLowerAmount, returnUpperAmount, returnLowerMonth, returnLowerYear } from '../../utilities/filters';


function* fetchCategoriesSaga(action) {
  try {
    const { type, month, year } = action.payload;
    const lowerBoundAmount = returnLowerAmount(type);
    const upperBoundAmount = returnUpperAmount(type);
    const lowerBoundMonth = returnLowerMonth(month).toString().padStart(2, '0');
    const upperBoundMonth = (returnLowerMonth(month) + 2).toString().padStart(2, '0');
    const lowerBoundYear = returnLowerYear(year).toString();
    const upperBoundYear = (returnLowerYear(year) + 2).toString();
    const categories = yield call(fetchCategories, { lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear, upperBoundYear });
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
    const {type, month, year} = {type: 'Any', month: 'This Month', year: 'This Year'};
    const lowerBoundAmount = returnLowerAmount(type);
    const upperBoundAmount = returnUpperAmount(type);
    const lowerBoundMonth = returnLowerMonth(month).toString().padStart(2, '0');
    const upperBoundMonth = (returnLowerMonth(month) + 2).toString().padStart(2, '0');
    const lowerBoundYear = returnLowerYear(year).toString();
    const upperBoundYear = (returnLowerYear(year) + 2).toString();
    const categories = yield call(fetchCategories, {lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear, upperBoundYear});
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
    const {type, month, year} = {type: 'Any', month: 'This Month', year: 'This Year'};
    const lowerBoundAmount = returnLowerAmount(type);
    const upperBoundAmount = returnUpperAmount(type);
    const lowerBoundMonth = returnLowerMonth(month).toString().padStart(2, '0');
    const upperBoundMonth = (returnLowerMonth(month) + 2).toString().padStart(2, '0');
    const lowerBoundYear = returnLowerYear(year).toString();
    const upperBoundYear = (returnLowerYear(year) + 2).toString();
    const categories = yield call(fetchCategories, {lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear, upperBoundYear});
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
    const categoryData = action.payload;
    yield call(deleteCategory, categoryData);
    const {type, month, year} = {type: 'Any', month: 'This Month', year: 'This Year'};
    const lowerBoundAmount = returnLowerAmount(type);
    const upperBoundAmount = returnUpperAmount(type);
    const lowerBoundMonth = returnLowerMonth(month).toString().padStart(2, '0');
    const upperBoundMonth = (returnLowerMonth(month) + 2).toString().padStart(2, '0');
    const lowerBoundYear = returnLowerYear(year).toString();
    const upperBoundYear = (returnLowerYear(year) + 2).toString();
    const categories = yield call(fetchCategories, {lowerBoundAmount, upperBoundAmount, lowerBoundMonth, upperBoundMonth, lowerBoundYear, upperBoundYear});
    yield put(deleteCategorySuccess(categories));
  }
  catch(error){
    yield put(deleteCategoryFailure(error));
  }
}

export function* watcDeleteCategories(){
  yield takeLatest(DELETE_CATEGORIES_REQUEST,deleteCategorySaga);
}

