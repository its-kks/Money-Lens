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

import {
  watchFetchRecurringPayments,
  watchAddRecurringPayment,
  watchUpdateRecurringPayment,
  watchDeleteRecurringPayment
} from './recurringPayments'

import { watchFetchCurrentMonthMoney } from './users';

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

      watchFetchCurrentMonthMoney(),

      watchFetchRecurringPayments(),
      watchAddRecurringPayment(),
      watchUpdateRecurringPayment(),
      watchDeleteRecurringPayment(),


    ]
  );
}