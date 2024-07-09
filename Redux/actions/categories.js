import { FETCH_CATEGORIES_REQUEST, 
    FETCH_CATEGORIES_FAILURE, 
    FETCH_CATEGORIES_SUCCESS,
    ADD_CATEGORIES_FAILURE,
    ADD_CATEGORIES_REQUEST,
    ADD_CATEGORIES_SUCCESS,
    UPDATE_CATEGORIES_FAILURE,
    UPDATE_CATEGORIES_REQUEST,
    UPDATE_CATEGORIES_SUCCESS,
    DELETE_CATEGORIES_FAILURE,
    DELETE_CATEGORIES_REQUEST,
    DELETE_CATEGORIES_SUCCESS
 } from '../constants'

// FETCH
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
        payload: categories
    }
}

// ADD
export function addCategoryRequest(transactionData) {
    return {
        type: ADD_CATEGORIES_REQUEST,
        payload: transactionData
    }
}

export function addCategorynFailure(error) {
    return {
        type: ADD_CATEGORIES_FAILURE,
        payload: error.message

    }
}

export function addCategorySuccess(transactionData) {
    return {
        type: ADD_CATEGORIES_SUCCESS,
        payload: transactionData
    }
}

// UPDATE
export function  updateCategoryRequest(transactionData) {
    return {
        type: UPDATE_CATEGORIES_REQUEST,
        payload: transactionData
    }
}

export function updateCategoryFailure(error) {
    return {
        type: UPDATE_CATEGORIES_FAILURE,
        payload: error.message

    }
}

export function  updateCategorySuccess(transactionData) {
    return {
        type: UPDATE_CATEGORIES_SUCCESS,
        payload: transactionData
    }
}

// DELETE
export function  deleteCategoryRequest(id) {
    return {
        type: DELETE_CATEGORIES_REQUEST,
        payload: id
    }
}

export function deleteCategoryFailure(error) {
    return {
        type: DELETE_CATEGORIES_FAILURE,
        payload: error.message

    }
}

export function  deleteCategorySuccess(transactionData) {
    return {
        type: DELETE_CATEGORIES_SUCCESS,
        payload: transactionData
    }
}