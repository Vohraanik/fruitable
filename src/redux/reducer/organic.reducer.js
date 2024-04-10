import { ADD_ORGANIC, DELETE_ORGANIC, EDIT_ORGANIC, GET_ORGANIC } from '../ActionType';


const initialState = {
    isLoading: false,
    organic: [],
    error: null
};

export const organicReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case GET_ORGANIC:
            return {
                isLoading: false,
                organic: action.payload,
                error: null
            };
        case ADD_ORGANIC:
            return{
                isLoading:false,
                organic:state.organic.concat(action.payload),
                error:null
            } 
        case DELETE_ORGANIC:
            return {
                isLoading: false,
                organic: state.organic.filter((v) => v.id !== action.payload),
                error: null
            } 
        case EDIT_ORGANIC:
            return {
                isLoading: false,
                organic: state.organic.map((v) => v.id === action.payload.id ? action.payload : v),
                error: null
            }          

        default:
            return state;
    }
};
