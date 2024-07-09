import {
  ADD_TRANSACTION_FAILURE,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  FETCH_TRANSACTIONS_REQUEST,
  FETCH_TRANSACTIONS_SUCCESS,
  UPDATE_TRANSACTION_FAILURE,
  UPDATE_TRANSACTION_REQUEST,
  UPDATE_TRANSACTION_SUCCESS
} from '../constants';

const initialState = {
  transactions: [],
  error: null,
  loading: false,
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TRANSACTIONS_SUCCESS:
      return { ...state, loading: false, transactions: action.payload };
    case FETCH_TRANSACTIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case ADD_TRANSACTION_SUCCESS:
      return { ...state, loading: false, transactions: action.payload };
    case ADD_TRANSACTION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case DELETE_TRANSACTION_FAILURE:
      return { ...state, loading: true, error: action.payload };
    case DELETE_TRANSACTION_SUCCESS:
      return { ...state, loading: false, transactions: action.payload };
    case UPDATE_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case UPDATE_TRANSACTION_FAILURE:
      return { ...state, loading: true, error: action.payload };
    case UPDATE_TRANSACTION_SUCCESS:
      return { ...state, loading: false, transactions: action.payload };
    default:
      return state;
  }
}

export default transactionReducer;