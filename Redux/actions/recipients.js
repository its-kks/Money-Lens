import {FETCH_RECIPIENTS_FAILURE, FETCH_RECIPIENTS_SUCCESS, FETCH_RECIPIENTS_REQUEST} from '../constants'
export function fetchRecipientsRequest() {
  return {
    type: FETCH_RECIPIENTS_REQUEST
  }
}

export function fetchRecipientsFailure(error) {
  return {
    type: FETCH_RECIPIENTS_FAILURE,
    error
  }
}

export function fetchRecipientsSuccess(recipients) {
  return {
    type: FETCH_RECIPIENTS_SUCCESS,
    recipients
  }
}