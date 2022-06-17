import {
    GET_DEPARTMENTS,
    GET_EMPLOYEES, NOT_FOUND_EMPLOYEE,
    RESET_EMPLOYEES_PAGINATION, SET_EMPLOYEE,
    SET_EMPLOYEES_PAGINATION, SET_EMPLOYEES_QUERY_PARAMS
} from "../actions/types";

const initialState = {
    employeesList:{
        count:0,
        data:[]
    },
    departmentsList:{
        count:0,
        data:[]
    },
    employeesPagination:{
        limit:10,
        offset:0
    },
    queryParams:'',
    resetEmployeesPagination:0,
    employee:{},
    notFoundEmployee:false
};

export const staffReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEES:
            return { ...state, employeesList:action.payload };
        case GET_DEPARTMENTS:
            return { ...state, departmentsList:action.payload };
        case SET_EMPLOYEES_QUERY_PARAMS:
            return { ...state, queryParams:action.payload };
        case SET_EMPLOYEES_PAGINATION:
            return { ...state, employeesPagination:{...action.payload} };
        case RESET_EMPLOYEES_PAGINATION:
            return { ...state, resetEmployeesPagination:action.payload}
        case SET_EMPLOYEE:
            return { ...state, employee:action.payload}
        case NOT_FOUND_EMPLOYEE:
            return { ...state, notFoundEmployee:action.payload}
        default: return state;
    }
};