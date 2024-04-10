import { ADD_FACILITIES, DELETE_FACILITIES, GET_FACILITIES, LOADING_FACILITIES, UPDATE_FACILITIES } from "../ActionType";

const initialState = {
    isLoading: false,
    facilities: [],
    error: null
};

export const facilitiesReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOADING_FACILITIES:
            return {
                ...state,
                isLoading: true,
            };
        case GET_FACILITIES:
            return {
                ...state
            };
        case ADD_FACILITIES:
            return {

                ...state,
                isLoading: false,
                facilities: state.facilities.concat(action.payload)
            };
        case DELETE_FACILITIES:
            return {
                ...state,
                isLoading: false,
                facilities: state.facilities.filter(v => v.id !== action.payload)
            };
        case UPDATE_FACILITIES:
            return {
                ...state,
                isLoading: false,
                facilities: state.facilities.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    }
                    return v
                })

            };




        default:
            return state;
    }
}
