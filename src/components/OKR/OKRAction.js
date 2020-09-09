import { FETCH_OKR_LOADING, FETCH_OKR_SUCCESS, FETCH_OKR_ERROR, SET_FILTER, CLEAR_FILTER } from "./OKRActionTypes"

export function getOKR() {
    return function(dispatch, getState) {
        dispatch(getOKRLoading(true));

        fetch(`https://okrcentral.github.io/sample-okrs/db.json`)
            .then(response => response.json())
            .then(json => {
                dispatch(getOKRSuccess(json.data))
            })
            .catch(err => {
                dispatch(getOKRError(err));
            })
    }
}

export function getOKRLoading(payload) {
    return {
        type: FETCH_OKR_LOADING,
        payload
    }
}

export function getOKRSuccess(payload) {
    return {
        type: FETCH_OKR_SUCCESS,
        payload
    }
}

export function getOKRError(payload) {
    return {
        type: FETCH_OKR_ERROR,
        payload
    }
}

export function setFilter(payload) {
    return {
        type: SET_FILTER,
        payload
    }
}

export function clearFilter() {
    return {
        type: CLEAR_FILTER
    }
}