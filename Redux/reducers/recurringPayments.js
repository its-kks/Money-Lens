import {
  FETCH_RECURRING_PAYMENTS_REQUEST,
  FETCH_RECURRING_PAYMENTS_FAILURE,
  FETCH_RECURRING_PAYMENTS_SUCCESS,
  ADD_RECURRING_PAYMENT_REQUEST,
  ADD_RECURRING_PAYMENT_FAILURE,
  ADD_RECURRING_PAYMENT_SUCCESS,
  UPDATE_RECURRING_PAYMENT_REQUEST,
  UPDATE_RECURRING_PAYMENT_FAILURE,
  UPDATE_RECURRING_PAYMENT_SUCCESS,
  DELETE_RECURRING_PAYMENT_REQUEST,
  DELETE_RECURRING_PAYMENT_FAILURE,
  DELETE_RECURRING_PAYMENT_SUCCESS

}
from '../constants'

const initialState = {
  recurringPayments: [],
  error: null,
  loading: false
}

const recurringPaymentsReducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_RECURRING_PAYMENTS_REQUEST:
      return { ...state, loading: true }
    case FETCH_RECURRING_PAYMENTS_SUCCESS:
      return { ...state, loading: false, recurringPayments: action.payload }
    case FETCH_RECURRING_PAYMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case ADD_RECURRING_PAYMENT_REQUEST:
      return { ...state, loading: true }
    case ADD_RECURRING_PAYMENT_SUCCESS:
      return { ...state, loading: false, recurringPayments: action.payload }
    case ADD_RECURRING_PAYMENT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case UPDATE_RECURRING_PAYMENT_REQUEST:
      return { ...state, loading: true }
    case UPDATE_RECURRING_PAYMENT_SUCCESS:
      return { ...state, loading: false, recurringPayments: action.payload }
    case UPDATE_RECURRING_PAYMENT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case DELETE_RECURRING_PAYMENT_REQUEST:
      return { ...state, loading: true }
    case DELETE_RECURRING_PAYMENT_SUCCESS:
      return { ...state, loading: false, recurringPayments: action.payload }
    case DELETE_RECURRING_PAYMENT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default recurringPaymentsReducer;