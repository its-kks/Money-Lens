import { Switch } from 'react-native-gesture-handler'
import{
  FETCH_SAVINGS_FAILURE,
  FETCH_SAVINGS_SUCCESS,
  FETCH_SAVINGS_REQUEST,
  ADD_SAVINGS_FAILURE,
  ADD_SAVINGS_SUCCESS,
  ADD_SAVINGS_REQUEST,
  UPDATE_SAVINGS_SUCCESS,
  UPDATE_SAVINGS_FAILURE,
  UPDATE_SAVINGS_REQUEST,
  DELETE_SAVINGS_SUCCESS,
  DELETE_SAVINGS_FAILURE,
  DELETE_SAVINGS_REQUEST,
} from '../constants'

const initialState = {
  savings: [],
  error: '',
  loading: false
}

export default function savingsReducer(state = initialState, action){
  switch(action.type){
    case FETCH_SAVINGS_REQUEST:
      return {...state, loading: true}
    case FETCH_SAVINGS_SUCCESS:
      return {...state, loading: false, savings: action.payload}
    case FETCH_SAVINGS_FAILURE:
      return {...state, loading: false, error: action.payload}
    case ADD_SAVINGS_REQUEST:
      return {...state, loading: true}
    case ADD_SAVINGS_SUCCESS:
      return {...state, loading: false, savings: action.payload}
    case ADD_SAVINGS_FAILURE:
      return {...state, loading: false, error: action.payload}
    case UPDATE_SAVINGS_REQUEST:
      return {...state, loading: true}
    case UPDATE_SAVINGS_SUCCESS:
      return {...state, loading: false, savings: action.payload}
    case UPDATE_SAVINGS_FAILURE:
      return {...state, loading: false, error: action.payload}
    case DELETE_SAVINGS_REQUEST:
      return {...state, loading: true}
    case DELETE_SAVINGS_SUCCESS:
      return {...state, loading: false, savings: action.payload}
    case DELETE_SAVINGS_FAILURE:
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}