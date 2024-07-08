import {all} from 'redux-saga/effects'
import watchFetchCategories from './categories'
import watchFetchRecipients from './recipients';
import watchAddTransaction from './transactions';

export default function* rootSaga(){
  yield all(
    [
      watchFetchCategories(),
      watchFetchRecipients(),
      watchAddTransaction()
    ]
  );
}