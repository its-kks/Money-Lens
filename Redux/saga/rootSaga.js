import {all} from 'redux-saga/effects'
import watchFetchCategories from './categories'
import watchFetchRecipients from './recipients';

export default function* rootSaga(){
  yield all(
    [
      watchFetchCategories(),
      watchFetchRecipients()
    ]
  );
}