import {
  ADD_TRANSACTION_FAILURE,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
} from '../constants';

const initialState = {
  transactions: [],
  error: null,
  loading: false,
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case ADD_TRANSACTION_SUCCESS:
      return { ...state, loading: false, transactions: [...state.transactions, action.payload] };
    case ADD_TRANSACTION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default transactionReducer;