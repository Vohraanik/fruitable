import { combineReducers } from "redux";
import { facilitiesReducer } from "./facilities.reducr";
import { organicReducer } from "./organic.reducer";
import { shopDetailReducer } from "./review.reducer";
import { productsReducer } from "./products.reducer";
import couponsSlice from "../slice/coupons.slice";
import cartSlice from "../slice/cart.slice";
import { subcategoryReducer } from "./subcategory.reducer";
import categorySlice from "../slice/category.slice";
import productsSlice from "../slice/products.slice";



export const rootReducer = combineReducers({
    facilities: facilitiesReducer,
    organic:organicReducer,
    review:shopDetailReducer,
    // products:productsReducer,
    cart:cartSlice,
    coupons:couponsSlice,
    subcategories:subcategoryReducer,
    category:categorySlice,
    products:productsSlice
})