import {
    RESET_MAIN_SCHEDULE_OUTPUT,
    SET_MAIN_SCHEDULE_INPUT,
    SET_MAIN_SCHEDULE_OUTPUT,
    SET_MAIN_SCHEDULE_PAGINATION, SET_SCHEDULE_QUERY_PARAMS
} from "../actions/types";

const initialState = {
    mainScheduleInput:{
        count:0,
        data:[]
    },
    mainScheduleOutput:[],
    mainSchedulePagination:{
        limit:10,
        offset:0
    },
    queryParams:''
};

export const sheetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAIN_SCHEDULE_INPUT:
            return { ...state, mainScheduleInput:{...action.payload} }
        case SET_MAIN_SCHEDULE_OUTPUT:
            return { ...state, mainScheduleOutput:[...state.mainScheduleOutput, ...action.payload] }
        case RESET_MAIN_SCHEDULE_OUTPUT:
            return { ...state, mainScheduleOutput:[] }
        case SET_MAIN_SCHEDULE_PAGINATION:
            return { ...state, mainSchedulePagination:{...action.payload} }
        case SET_SCHEDULE_QUERY_PARAMS:
            return { ...state, queryParams:action.payload }
        default: return state;
    }
};