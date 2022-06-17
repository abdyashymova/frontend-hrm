import {combineReducers} from "redux";
import {staffReducer} from "./staffReducer";
import {modalReducer} from "./modalReducer";
import {sheetReducer} from "./sheetReducer";
import {staffRateReducer} from "./staffRateReducer";
import {monthReducer} from "./monthReducer";
import {loginReducer} from "./loginReducer";

export const rootReducer = combineReducers({
    staff:staffReducer,
    modal:modalReducer,
    sheet:sheetReducer,
    staff_rate:staffRateReducer,
    months:monthReducer,
    login:loginReducer
});