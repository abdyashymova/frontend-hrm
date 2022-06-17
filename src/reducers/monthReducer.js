import {
    SET_MONTH,
} from "../actions/types";

const initialState = {
    months:{
        count:0,
        data:[]
    },
};

export const monthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MONTH:
            return { ...state, months:{...action.payload} }
        default: return state;
    }
};