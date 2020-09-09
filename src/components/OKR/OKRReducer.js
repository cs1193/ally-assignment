import _ from 'lodash';
import { FETCH_OKR_LOADING, FETCH_OKR_SUCCESS, FETCH_OKR_ERROR, SET_FILTER, CLEAR_FILTER } from './OKRActionTypes';

const initialState = {
    okr: [],
    loading: false,
    errors: null,
    keys: {},
    filters: [],
    currentFilter: ''
};

export default function OKRReducer(state = initialState, { type, payload }) {
    switch(type) {
        case FETCH_OKR_LOADING: {
            return {
                ...state,
                loading: payload
            }
        }
        case FETCH_OKR_SUCCESS: {
            const objectives = payload.filter((data) => !data.parent_objective_id);

            const filters = _.keys(_.groupBy(payload, 'category'));

            const keys = payload.reduce((acc, data, index) => {
                if (data.parent_objective_id) {
                    acc[data.parent_objective_id] = acc[data.parent_objective_id] || [];
                    acc[data.parent_objective_id].push(
                        _.escape(data.title)
                    )
                }
                return acc;
            }, {});

            return {
                ...state,
                okr: objectives,
                keys,
                filters,
                loading: false
            }
        }
        case FETCH_OKR_ERROR: {
            return {
                ...state,
                loading: false,
                error: payload
            }
        }
        case SET_FILTER: {
            return {
                ...state,
                currentFilter: payload
            }
        }
        case CLEAR_FILTER: {
            return {
                ...state,
                currentFilter: ''
            }
        }
        default:
            return state;
    }
}