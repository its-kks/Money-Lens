import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_REQUEST,
  ADD_CATEGORIES_FAILURE,
  ADD_CATEGORIES_REQUEST,
  ADD_CATEGORIES_SUCCESS,
  DELETE_CATEGORIES_FAILURE,
  DELETE_CATEGORIES_REQUEST,
  DELETE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_FAILURE,
  UPDATE_CATEGORIES_REQUEST,
  UPDATE_CATEGORIES_SUCCESS
} from "../constants"

const initialState = {
  categories: [],
  error: null,
  loading: false
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true }
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload }
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case ADD_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case ADD_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case ADD_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case DELETE_CATEGORIES_FAILURE:
      return { ...state, loading: true, error: action.payload };
    case DELETE_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case UPDATE_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case UPDATE_CATEGORIES_FAILURE:
      return { ...state, loading: true, error: action.payload };
    case UPDATE_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    default:
      return state
  }
}

export default categoryReducer;