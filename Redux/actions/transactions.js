import {
  ADD_TRANSACTION_FAILURE,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
} from '../constants'

export function addTransactionRequest(transactionData) {
  return {
    type: ADD_TRANSACTION_REQUEST,
    payload: transactionData
  }
}

export function addTransactionFailure(error) {
  return {
    type: ADD_TRANSACTION_FAILURE,
    payload: error.message
    
  }
}

export function addTransactionSuccess(transactionData) {
  return {
    type: ADD_TRANSACTION_SUCCESS,
    payload: transactionData
  }
}