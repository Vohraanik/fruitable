import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities.reducr";
import { organicReducer } from "./organic.reducer";
import { shopDetailReducer } from "./review.reducer";
import { productsReducer } from "./products.reducer";
import couponsSlice from "../slice/coupons.slice";
import cartSlice from "../slice/cart.slice";



export const rootReducer = combineReducers({
    facilities: facilitiesReducer,
    organic:organicReducer,
    review:shopDetailReducer,
    products:productsReducer,
    cart:cartSlice,
    coupons:couponsSlice
   


})