import {
  FETCH_RECIPIENTS_FAILURE,
  FETCH_RECIPIENTS_REQUEST,
  FETCH_RECIPIENTS_SUCCESS,
  ADD_RECIPIENTS_REQUEST,
  ADD_RECIPIENTS_FAILURE,
  ADD_RECIPIENTS_SUCCESS,
  UPDATE_RECIPIENTS_REQUEST,
  UPDATE_RECIPIENTS_FAILURE,
  UPDATE_RECIPIENTS_SUCCESS,
  DELETE_RECIPIENTS_REQUEST,
  DELETE_RECIPIENTS_FAILURE,
  DELETE_RECIPIENTS_SUCCESS
} from '../constants';

const initialState = {
  recipients: [],
  error: null,
  loading: false
}

const recipientReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPIENTS_REQUEST:
      return { ...state, loading: true }
    case FETCH_RECIPIENTS_SUCCESS:
      return { ...state, loading: false, recipients: action.recipients }
    case FETCH_RECIPIENTS_FAILURE:
      return { ...state, loading: false, error: action.error }
    case ADD_RECIPIENTS_REQUEST:
      return { ...state, loading: true };
    case ADD_RECIPIENTS_SUCCESS:
      return { ...state, loading: false, recipients: action.payload };
    case ADD_RECIPIENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_RECIPIENTS_REQUEST:
      return { ...state, loading: true };
    case DELETE_RECIPIENTS_FAILURE:
      return { ...state, loading: true, error: action.payload };
    case DELETE_RECIPIENTS_SUCCESS:
      return { ...state, loading: false, recipients: action.payload };
    case UPDATE_RECIPIENTS_REQUEST:
      return { ...state, loading: true };
    case UPDATE_RECIPIENTS_FAILURE:
      return { ...state, loading: true, error: action.payload };
    case UPDATE_RECIPIENTS_SUCCESS:
      return { ...state, loading: false, recipients: action.payload };
    default:
      return state
  }
}

export default recipientReducer;