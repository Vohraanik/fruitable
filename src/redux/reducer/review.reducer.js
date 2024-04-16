import { ADD_REVIEW, GET_REVIEW } from "../ActionType";

const initialState = {
    isLoading: false,
    review: [],
    error: null
};

export const shopDetailReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_REVIEW:   
            return {
                isLoading: false,
                review: action.payload,
                error: null
            }
        case ADD_REVIEW:
            return {
                isLoading: false,
                review: state.review.concat(action.payload),
                error: null
            };
      
        default:
            return state;
    }
};