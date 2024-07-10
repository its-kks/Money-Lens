import {
  FETCH_RECIPIENTS_FAILURE,
  FETCH_RECIPIENTS_SUCCESS,
  FETCH_RECIPIENTS_REQUEST,
  ADD_RECIPIENTS_FAILURE,
  ADD_RECIPIENTS_REQUEST,
  ADD_RECIPIENTS_SUCCESS,
  UPDATE_RECIPIENTS_FAILURE,
  UPDATE_RECIPIENTS_REQUEST,
  UPDATE_RECIPIENTS_SUCCESS,
  DELETE_RECIPIENTS_FAILURE,
  DELETE_RECIPIENTS_REQUEST,
  DELETE_RECIPIENTS_SUCCESS
} from '../constants'
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

// ADD
export function addRecipientRequest(recipients) {
  return {
    type: ADD_RECIPIENTS_REQUEST,
    payload: recipients
  }
}

export function addRecipientFailure(error) {
  return {
    type: ADD_RECIPIENTS_FAILURE,
    payload: error.message
  }
}

export function addRecipientSuccess(recpients) {
  return {
    type: ADD_RECIPIENTS_SUCCESS,
    payload: recpients
  }
}

// UPDATE

export function updateRecipientRequest(recipients) {
  return {
    type: UPDATE_RECIPIENTS_REQUEST,
    payload: recipients
  }
}

export function updateRecipientFailure(error) {
  return {
    type: UPDATE_RECIPIENTS_FAILURE,
    payload: error.message
  }
}

export function updateRecipientSuccess(recipients) {
  return {
    type: UPDATE_RECIPIENTS_SUCCESS,
    payload: recipients
  }
}

// DELETE


export function deleteRecipientRequest(id) {
  return {
    type: DELETE_RECIPIENTS_REQUEST,
    payload: id
  }
}

export function deleteRecipientFailure(error) {
  return {
    type: DELETE_RECIPIENTS_FAILURE,
    payload: error.message
  }
}

export function deleteRecipientSuccess(recipients) {
  return {
    type: DELETE_RECIPIENTS_SUCCESS,
    payload: recipients
  }
}