import {
  FETCH_CURRENT_MONTH_MONEY_FAILURE,
  FETCH_CURRENT_MONTH_MONEY_REQUEST,
  FETCH_CURRENT_MONTH_MONEY_SUCCESS
} from "../constants";

const initialState = {
  currentMonthMoney: [],
  loading: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_MONTH_MONEY_REQUEST:
      return { ...state, loading: true };
    case FETCH_CURRENT_MONTH_MONEY_SUCCESS:
      return { ...state, loading: false, currentMonthMoney: action.payload };
    case FETCH_CURRENT_MONTH_MONEY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default userReducer;