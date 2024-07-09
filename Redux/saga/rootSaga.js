import {all} from 'redux-saga/effects'
import {watchFetchCategories,
  watcDeleteCategories,
  watcUpdateCategories,
  watchAddCategory
} from './categories'
import watchFetchRecipients from './recipients';
import {watchAddTransaction, 
watchFetchTransactions,
watcDeleteTransactions,
watcUpdateTransactions
} from './transactions';

export default function* rootSaga(){
  yield all(
    [
      watchFetchCategories(),
      watcDeleteCategories(),
      watcUpdateCategories(),
      watchAddCategory(),
      watchFetchRecipients(),
      watchAddTransaction(),
      watchFetchTransactions(),
      watcUpdateTransactions(),
      watcDeleteTransactions()

    ]
  );
}