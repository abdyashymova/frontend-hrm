import {
    RESET_STAFF_RATE_DATA_OUTPUT,
    SET_STAFF_RATE_DATA,
    SET_STAFF_RATE_DATA_OUTPUT, SET_STAFF_RATE_PAGINATION,
    SET_STAFF_RATE_QUERY_PARAMS
} from "../actions/types";

const initialState = {
    data:{
        count:0,
        data:[]
    },
    data_output:{},
    queryParams:'',
    pagination:{}
};

export const staffRateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STAFF_RATE_DATA:
            return { ...state, data:action.payload }
        case SET_STAFF_RATE_DATA_OUTPUT:
            return { ...state, data_output:{...state.data_output, ...action.payload} }
        case RESET_STAFF_RATE_DATA_OUTPUT:
            return { ...state, data_output: {} }
        case SET_STAFF_RATE_QUERY_PARAMS:
            return { ...state, queryParams:action.payload }
        case SET_STAFF_RATE_PAGINATION:
            return { ...state, pagination:action.payload }
        default: return state;
    }
};