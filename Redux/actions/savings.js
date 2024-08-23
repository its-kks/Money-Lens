import{
  FETCH_SAVINGS_FAILURE,
  FETCH_SAVINGS_REQUEST,
  FETCH_SAVINGS_SUCCESS,
  ADD_SAVINGS_REQUEST,
  ADD_SAVINGS_FAILURE,
  ADD_SAVINGS_SUCCESS,
  UPDATE_SAVINGS_REQUEST,
  UPDATE_SAVINGS_FAILURE,
  UPDATE_SAVINGS_SUCCESS,
  DELETE_SAVINGS_REQUEST,
  DELETE_SAVINGS_FAILURE,
  DELETE_SAVINGS_SUCCESS
} from '../constants'

export function fetchSavingsRequest(){
  return {
    type: FETCH_SAVINGS_REQUEST
  }
}

export function fetchSavingsFailure(error){
  return {
    type: FETCH_SAVINGS_FAILURE,
    payload: error.message
  }
}

export function fetchSavingsSuccess(savings){
  return {
    type: FETCH_SAVINGS_SUCCESS,
    payload: savings
  }
}

export function addSavingsRequest(savings){
  return {
    type: ADD_SAVINGS_REQUEST,
    payload: savings
  }
}

export function addSavingsFailure(error){
  return {
    type: ADD_SAVINGS_FAILURE,
    payload: error.message
  }
}

export function addSavingsSuccess(savings){
  return {
    type: ADD_SAVINGS_SUCCESS,
    payload: savings
  }
}


export function updateSavingsRequest(saving){
  return {
    type: UPDATE_SAVINGS_REQUEST,
    payload: saving
  }
}

export function updateSavingsFailure(error){
  return {
    type: UPDATE_SAVINGS_FAILURE,
    payload: error.message
  }
}

export function updateSavingsSuccess(savings){
  return {
    type: UPDATE_SAVINGS_SUCCESS,
    payload: savings
  }
}

export function deleteSavingsRequest(id){
  return {
    type: DELETE_SAVINGS_REQUEST,
    payload: id
  }
}

export function deleteSavingsFailure(error){
  return {
    type: DELETE_SAVINGS_FAILURE,
    payload: error.message
  }
}


export function deleteSavingsSuccess(savings){
  return {
    type: DELETE_SAVINGS_SUCCESS,
    payload: savings
  }
}
