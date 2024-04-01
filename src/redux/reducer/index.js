import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities.reducr";

export const rootReducer = combineReducers({
    facilities: facilitiesReducer
})