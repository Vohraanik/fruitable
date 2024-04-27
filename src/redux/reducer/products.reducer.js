import {  ADD_PRODUCTS,  DELETE_PRODUCTS, EDIT_PRODUCTS, ERROR_ORGANIC, ERROR_PRODUCTS, GET_ORGANIC, GET_PRODUCTS, LOADING_PRODUCTS,} from '../ActionType';

const initialState = {
    isLoading: false,
    products: [],
    error: null
};

export const productsReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOADING_PRODUCTS:
            return {
                ...state,
                isLoading: true
            };

        case ERROR_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }    

        case GET_PRODUCTS:
            return {
                isLoading: false,
                products: action.payload,
                error: null
            };
        case ADD_PRODUCTS:
            return {
                isLoading: false,
                products: state.products.concat(action.payload),
                error: null
            };
        case DELETE_PRODUCTS:
            return {
                isLoading: false,
                products: state.products.filter((v) => v.id !== action.payload),
                error: null
            };
        case EDIT_PRODUCTS:
            return {
                isLoading: false,
                products: state.products.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                }),
                error: null
            };
        default:
            return state;
    }
};
