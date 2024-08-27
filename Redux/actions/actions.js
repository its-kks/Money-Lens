import {
  FETCH_ACTIONS_FAILURE,
  FETCH_ACTIONS_REQUEST,
  FETCH_ACTIONS_SUCCESS,
  ADD_ACTIONS_REQUEST,
  ADD_ACTIONS_FAILURE,
  ADD_ACTIONS_SUCCESS,
  DELETE_ACTIONS_REQUEST,
  DELETE_ACTIONS_FAILURE,
  DELETE_ACTIONS_SUCCESS

} from '../constants';

export function fetchActionsRequest(){
  return {
    type: FETCH_ACTIONS_REQUEST
  }

}

export function fetchActionsFailure(error){
  return {
    type: FETCH_ACTIONS_FAILURE,
    payload: error.message
  }
}

export function fetchActionsSuccess(actions){
  return {
    type: FETCH_ACTIONS_SUCCESS,
    payload: actions
  }
}

export function addActionRequest(actionData){
  return {
    type: ADD_ACTIONS_REQUEST,
    payload: actionData
  }
}

export function addActionFailure(error){
  return {
    type: ADD_ACTIONS_FAILURE,
    payload: error.message
  }
}

export function addActionSuccess(actions){
  return {
    type: ADD_ACTIONS_SUCCESS,
    payload: actions
  }
}

export function deleteActionRequest(id){
  return {
    type: DELETE_ACTIONS_REQUEST,
    payload: id
  }
}

export function deleteActionFailure(error){
  return {
    type: DELETE_ACTIONS_FAILURE,
    payload: error.message
  }
}

export function deleteActionSuccess(actions){
  return {
    type: DELETE_ACTIONS_SUCCESS,
    payload: actions
  }
}