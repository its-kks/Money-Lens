import {
  FETCH_BAR_DATA_FAILURE,
  FETCH_BAR_DATA_REQUEST,
  FETCH_BAR_DATA_SUCCESS,
} from '../constants'

export const fetchBarDataRequest = (filters) => {
  return {
    type: FETCH_BAR_DATA_REQUEST,
    payload: filters,
  }
}

export const fetchBarDataSuccess = (data) => {
  return {
    type: FETCH_BAR_DATA_SUCCESS,
    payload: data,
  }
}

export const fetchBarDataFailure = (error) => {
  return {
    type: FETCH_BAR_DATA_FAILURE,
    payload: error.message,
  }
}