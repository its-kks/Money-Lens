import { all } from 'redux-saga/effects'
import {
  watchFetchCategories,
  watcDeleteCategories,
  watcUpdateCategories,
  watchAddCategory
} from './categories'
import {
  watchFetchRecipients,
  watchAddRecipient,
  watchUpdateRecipient,
  watchDeleteRecipient
} from './recipients';
import {
  watchAddTransaction,
  watchFetchTransactions,
  watcDeleteTransactions,
  watcUpdateTransactions
} from './transactions';

export default function* rootSaga() {
  yield all(
    [
      watchFetchCategories(),
      watcDeleteCategories(),
      watcUpdateCategories(),
      watchAddCategory(),

      watchFetchRecipients(),
      watchAddRecipient(),
      watchUpdateRecipient(),
      watchDeleteRecipient(),
      
      watchAddTransaction(),
      watchFetchTransactions(),
      watcUpdateTransactions(),
      watcDeleteTransactions(),

    ]
  );
}