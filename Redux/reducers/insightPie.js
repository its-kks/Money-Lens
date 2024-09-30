import {
  FETCH_PIE_DATA_REQUEST,
  FETCH_PIE_DATA_SUCCESS,
  FETCH_PIE_DATA_FAILURE,
} from '../constants';

const initialState = {
  pieData: [],
  error: null,
  loading: false,
};

const insightPieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PIE_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_PIE_DATA_SUCCESS:
      return { ...state, loading: false, pieData: action.payload };
    case FETCH_PIE_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default insightPieReducer;