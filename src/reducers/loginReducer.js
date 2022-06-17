import {LOGIN_SUCCESS} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };


export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, isLoggedIn:true, user:{...action.payload} };
        default: return state;
    }
};