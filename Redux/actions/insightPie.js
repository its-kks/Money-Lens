import {
  FETCH_PIE_DATA_FAILURE,
  FETCH_PIE_DATA_REQUEST,
  FETCH_PIE_DATA_SUCCESS,
} from '../constants';

export const fetchPieDataRequest = (filters) => {
  return {
    type: FETCH_PIE_DATA_REQUEST,
    payload: filters,
  };
}

export const fetchPieDataSuccess = (data) => {
  return {
    type: FETCH_PIE_DATA_SUCCESS,
    payload: data,
  };
}

export const fetchPieDataFailure = (error) => {
  return {
    type: FETCH_PIE_DATA_FAILURE,
    payload: error.message,
  };
}