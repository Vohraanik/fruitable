import { ADD_SUBCATEGORY, DELETE_SUBCATEGORY, EDIT_SUBCATEGORY, ERROR_SUBCATEGORY, FILTER_SUBCATEGORY, GET_SUBCATEGORY, LOADING_SUBCATEGORY } from "../ActionType";

const initialState = {
    isLoading: false,
    subcategory: [],
    error: null
};

export const subcategoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOADING_SUBCATEGORY:
            return {
                ...state,
                isLoading: true
            };

        case ERROR_SUBCATEGORY:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        case GET_SUBCATEGORY:
            return {
                isLoading: false,
                subcategory: action.payload.data,
                error: null
            };

        case ADD_SUBCATEGORY:
            return {
                isLoading: false,
                subcategory: [...state.subcategory, action.payload.data],
                error: null
            };

        case DELETE_SUBCATEGORY:
            return {
                isLoading: false,
                subcategory: state.subcategory.filter((v) => v._id !== action.payload),
                error: null
            };

        case EDIT_SUBCATEGORY:
            return {
                isLoading: false,
                subcategory: state.subcategory.map((v) => v._id === action.payload.data._id ? action.payload.data : v),
                error: null
            };
        default:
            return state;
    }
};
