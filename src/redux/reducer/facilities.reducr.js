import { ADD_FACILITIES, DELETE_FACILITIES, UPDATE_FACILITIES } from "../ActionType";

const instialState = {
    isLoading: false,
    facilities: [],
    error: null
};

export const facilitiesReducer = (state = instialState, action) => {
    console.log(action);
    switch (action.type) {
        case ADD_FACILITIES:
            return {
                ...state,
              facilities: state.facilities.concat(action.payload)
            };
        case DELETE_FACILITIES:
            return {
                ...state,
                facilities: state.facilities.filter(v => v.id !== action.payload)
            };
        case UPDATE_FACILITIES:
            return {
                ...state,
                facilities: state.facilities.map(v => v.id === action.payload.id ? action.payload : v)

            };

        default:
            return state;
    }
}