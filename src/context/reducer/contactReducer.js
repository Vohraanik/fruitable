import { ADD_CONTACT } from "../ActionType";

export const ContactReducer = (state, action) => {
    console.log(action.payload);
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contact: state.contact.concat(action.payload)
            };
        default:
            return state


    }
} 