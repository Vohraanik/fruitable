//fruitsReducer.js
import { ADD_FRUITS, DELETE_FRUITS, EDIT_FRUITS, GET_FRUITS } from "../ActionType";


export const FruitsReducer =(state,action) => {
    console.log(action);
    switch(action.type){
        case GET_FRUITS:
            return {
                fruits:action.payload
            }
        case ADD_FRUITS:
            return {       
              fruits:state.fruits.concat(action.payload)
            };
        case EDIT_FRUITS: 
            return {
                fruits: state.fruits.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                }),
            };
        case DELETE_FRUITS:
            return {
                fruits: state.fruits.filter((v) => v.id !== action.payload),
            }    
        default:
            return state
    }
}