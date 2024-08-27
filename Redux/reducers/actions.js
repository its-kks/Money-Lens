import {
  FETCH_ACTIONS_FAILURE,
  FETCH_ACTIONS_REQUEST,
  FETCH_ACTIONS_SUCCESS,
  ADD_ACTIONS_FAILURE,
  ADD_ACTIONS_REQUEST,
  ADD_ACTIONS_SUCCESS,
  DELETE_ACTIONS_FAILURE,
  DELETE_ACTIONS_REQUEST,
  DELETE_ACTIONS_SUCCESS
} from '../constants';

const initialState = {
  actions: [],
  error: null,
  loading: false
}

const actionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIONS_REQUEST:
      return {...state, loading: true}
    case FETCH_ACTIONS_FAILURE:
      return {...state, loading: false, error: action.payload }
    case FETCH_ACTIONS_SUCCESS:
      return {...state, loading: false, action: action.payload}
    case ADD_ACTIONS_REQUEST:
      return {...state, loading: true}
    case ADD_ACTIONS_FAILURE:
      return {...state, loading: false, error: action.payload}
    case ADD_ACTIONS_SUCCESS:
      return {...state, loading: false, actions: action.payload}
    case DELETE_ACTIONS_REQUEST:
      return {...state, loading: true}
    case DELETE_ACTIONS_FAILURE:
      return {...state, loading: false, error: action.payload}
    case DELETE_ACTIONS_SUCCESS:
      return {...state, loading: false, actions: action.payload}
    default:
      return state
  }
}

export default actionReducer;