import {
  ADD_TRANSACTION_FAILURE,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_REQUEST,
  UPDATE_TRANSACTION_FAILURE,
  UPDATE_TRANSACTION_SUCCESS
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

export function fetchTransactionRequest(){
  return {
    type: FETCH_TRANSACTIONS_REQUEST
  }

}

export function fetchTransactionFailure(error){
  return {
    type: FETCH_TRANSACTIONS_FAILURE,
    payload: error.message
  }
}

export function fetchTransactionSuccess(transactions){
  return {
    type: FETCH_TRANSACTIONS_SUCCESS,
    payload: transactions
  }
}

export function deleteTransactionRequest(id){
  return {
    type: DELETE_TRANSACTION_REQUEST,
    payload: id
  }
}

export function deleteTransactionSuccess(transactions){
  return {
    type: DELETE_TRANSACTION_SUCCESS,
    payload: transactions
  }
}

export function deleteTransactionFailure(error){
  return {
    type: DELETE_TRANSACTION_FAILURE,
    payload: error.message
  }
}

export function updateTransactionRequest(transactions){
  return {
    type: UPDATE_TRANSACTION_REQUEST,
    payload: transactions
  }
}

export function updateTransactionSuccess(transactions){
  return {
    type: UPDATE_TRANSACTION_SUCCESS,
    payload: transactions
  }
}

export function updateTransactionFailure(error){
  return {
    type: UPDATE_TRANSACTION_FAILURE,
    payload: error.message
  }
}