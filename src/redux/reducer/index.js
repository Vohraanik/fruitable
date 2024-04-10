import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities.reducr";
import { organicReducer } from "./organic.reducer";

export const rootReducer = combineReducers({
    facilities: facilitiesReducer,
    organic:organicReducer
})