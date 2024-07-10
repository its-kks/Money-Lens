import {
  FETCH_CURRENT_MONTH_MONEY_FAILURE,
  FETCH_CURRENT_MONTH_MONEY_REQUEST,
  FETCH_CURRENT_MONTH_MONEY_SUCCESS,
}
from '../constants';

export const fetchCurrentMonthMoneyRequest = () => {
  return {
    type: FETCH_CURRENT_MONTH_MONEY_REQUEST
  }
}

export const fetchCurrentMonthMoneySuccess = (money) => {
  return {
    type: FETCH_CURRENT_MONTH_MONEY_SUCCESS,
    payload: money
  }
}

export const fetchCurrentMonthMoneyFailure = (error) => {
  return {
    type: FETCH_CURRENT_MONTH_MONEY_FAILURE,
    payload: error.message
  }
}