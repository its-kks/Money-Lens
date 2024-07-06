import { FETCH_RECIPIENTS_FAILURE, FETCH_RECIPIENTS_REQUEST, FETCH_RECIPIENTS_SUCCESS } from '../constants';

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
    default:
      return state
  }
}

export default recipientReducer;