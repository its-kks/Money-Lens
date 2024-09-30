import {
  FETCH_BAR_DATA_REQUEST,
  FETCH_BAR_DATA_SUCCESS,
  FETCH_BAR_DATA_FAILURE,
} from '../constants';

const initialState = {
  barData: [],
  error: null,
  loading: false,
};

const insightBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BAR_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_BAR_DATA_SUCCESS:
      return { ...state, loading: false, barData: action.payload };
    case FETCH_BAR_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}


export default insightBarReducer;