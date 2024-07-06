import {pass, takeLatest, call, put} from 'redux-saga/effects';
import {fetchRecipientsRequest, fetchRecipientsSuccess, fetchRecipientsFailure} from '../actions/recipients';
import {fetchRecipients} from '../../sql/dbRecipients';
import {FETCH_RECIPIENTS_REQUEST}  from '../constants';


function *fetchRecipientsSaga(){
  try{
    const recipients = yield call(fetchRecipients);
    yield put(fetchRecipientsSuccess(recipients));
  }
  catch(error){
    yield put(fetchRecipientsFailure(error));
  }
}

function *watchFetchRecipients(){
  yield takeLatest(FETCH_RECIPIENTS_REQUEST, fetchRecipientsSaga);
}

export default watchFetchRecipients;