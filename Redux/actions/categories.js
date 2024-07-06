import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_SUCCESS } from '../constants'

export function fetchCategoriesRequest() {
    return {
        type: FETCH_CATEGORIES_REQUEST
    }
}

export function fetchCategoriesFailure(error) {
    return {
        type: FETCH_CATEGORIES_FAILURE,
        payload: error.message
    }
}

export function fetchCategoriesSuccess(categories) {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        payload : categories
    }
}