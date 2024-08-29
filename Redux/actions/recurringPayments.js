import {
  ADD_RECURRING_PAYMENT_REQUEST,
  ADD_RECURRING_PAYMENT_FAILURE,
  ADD_RECURRING_PAYMENT_SUCCESS,
  UPDATE_RECURRING_PAYMENT_REQUEST,
  UPDATE_RECURRING_PAYMENT_FAILURE,
  UPDATE_RECURRING_PAYMENT_SUCCESS,
  DELETE_RECURRING_PAYMENT_REQUEST,
  DELETE_RECURRING_PAYMENT_FAILURE,
  DELETE_RECURRING_PAYMENT_SUCCESS,
  FETCH_RECURRING_PAYMENTS_REQUEST,
  FETCH_RECURRING_PAYMENTS_FAILURE,
  FETCH_RECURRING_PAYMENTS_SUCCESS
} from '../constants'

export function fetchRecurringPaymentsRequest(filter){
  return {
    type: FETCH_RECURRING_PAYMENTS_REQUEST,
    payload: filter
  }
}

export function fetchRecurringPaymentsFailure(error){
  return {
    type: FETCH_RECURRING_PAYMENTS_FAILURE,
    payload: error.message
  }
}

export function fetchRecurringPaymentsSuccess(recurringPayments){
  return {
    type: FETCH_RECURRING_PAYMENTS_SUCCESS,
    payload: recurringPayments
  }
}

export function addRecurringPaymentRequest(recurringPayment){
  return {
    type: ADD_RECURRING_PAYMENT_REQUEST,
    payload: recurringPayment
  }
}

export function addRecurringPaymentFailure(error){
  return {
    type: ADD_RECURRING_PAYMENT_FAILURE,
    payload: error.message
  }
}

export function addRecurringPaymentSuccess(recurringPayment){
  return {
    type: ADD_RECURRING_PAYMENT_SUCCESS,
    payload: recurringPayment
  }
}

export function updateRecurringPaymentRequest(recurringPayment){
  // ID Receiving checked 
  return {
    type: UPDATE_RECURRING_PAYMENT_REQUEST,
    payload: recurringPayment
  }
}

export function updateRecurringPaymentFailure(error){
  return {
    type: UPDATE_RECURRING_PAYMENT_FAILURE,
    payload: error.message
  }
}

export function updateRecurringPaymentSuccess(recurringPayment){
  return {
    type: UPDATE_RECURRING_PAYMENT_SUCCESS,
    payload: recurringPayment
  }
}

export function deleteRecurringPaymentRequest(recurringPayment){
  return {
    type: DELETE_RECURRING_PAYMENT_REQUEST,
    payload: recurringPayment
  }
}

export function deleteRecurringPaymentFailure(error){
  return {
    type: DELETE_RECURRING_PAYMENT_FAILURE,
    payload: error.message
  }
}

export function deleteRecurringPaymentSuccess(recurringPayment){
  return {
    type: DELETE_RECURRING_PAYMENT_SUCCESS,
    payload: recurringPayment
  }
}

