import { createContext, useReducer } from "react"
import{ ContactReducer} from "../context/reducer/contactReducer"
import axios from "axios";
import { BASE_URL } from "../utils/baseUrl";
import { ADD_CONTACT } from "./ActionType";


const initialState = {
    isLoading: false,
    contact: [],
    error: null,
};


export const contactContext = createContext();

export const ContactProvider = ({children}) => {
    const [state,dispatch] = useReducer(ContactReducer,initialState) 


    const addContact = async(data) => {
        try {
            const response = await axios.post(BASE_URL + 'contact' , data)
            dispatch({ type: ADD_CONTACT, payload: response.data })
           
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <contactContext.Provider value={{
            ...state,
            addContact
        }}>
            {children}
        </contactContext.Provider>
    )
} 