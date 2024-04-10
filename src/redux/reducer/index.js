import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities.reducr";
import { organicReducer } from "./organic.reducer";
import { shopDetailReducer } from "./review.reducer";


export const rootReducer = combineReducers({
    facilities: facilitiesReducer,
    organic:organicReducer,
    review:shopDetailReducer
})