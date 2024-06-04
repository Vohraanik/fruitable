import React, { createContext, useReducer } from "react";
import axios from "axios";
import { FruitsReducer } from "./reducer/friuts.reducer";
import { BASE_URL } from "../utils/baseUrl";
import { ADD_FRUITS, DELETE_FRUITS, EDIT_FRUITS, GET_FRUITS } from "./ActionType";

const initialState = {
    isLoading: false,
    fruits: [],
    error: null,
};

export const fruitsContext = createContext();

export const FruitsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FruitsReducer, initialState);

    const getFruits = async () => {
        try {
            const response = await axios.get(BASE_URL + 'fruits');
            dispatch({ type: GET_FRUITS, payload: response.data });
        } catch (error) {
            console.log(error.message);
        }
    };

    const addFruits = async (val) => {
        try {
            const response = await axios.post(BASE_URL + 'fruits', val);
            dispatch({ type: ADD_FRUITS, payload: response.data });
        } catch (error) {
            console.log(error.message);
        }
    };

    const editFruits = async (val) => {
        try {
            await axios.put(BASE_URL + 'fruits/' + val.id, val)
                .then(response => dispatch({ type: EDIT_FRUITS, payload: response.data }))

        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteFruits = async (id) => {
        try {
            await axios.delete(BASE_URL + 'fruits/' + id)
                .then(response => dispatch({ type: DELETE_FRUITS, payload: id }))
        } catch (error) {
            dispatch(error.message)
        }
    }

    return (
        <fruitsContext.Provider value={{ ...state, addFruits, getFruits, editFruits, deleteFruits }}>
            {children}
        </fruitsContext.Provider>
    );
};
