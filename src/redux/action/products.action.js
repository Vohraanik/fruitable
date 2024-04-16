
import axios from 'axios';
import { BASE_URL } from '../../utils/baseUrl';
import { ADD_PRODUCTS, DELETE_PRODUCTS, EDIT_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS,LOADING_PRODUCTS,  } from '../ActionType';


export const setLoading = () => async(dispatch) =>{
    dispatch({type:LOADING_PRODUCTS})
}

export const setError = (error) => async(dispatch) =>{
    dispatch({type:ERROR_PRODUCTS,payload:error})
}

export const getProducts = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        await axios.get(BASE_URL + 'products')
            .then(response => dispatch({ type: GET_PRODUCTS, payload: response.data }))
            .then(error =>  dispatch(setError(error.message)))
    } catch (error) {
            dispatch(setError(error.message))
    }
}

export const addProducts = (data) => async (dispatch) => {
    dispatch(setLoading());
    try {
        await axios.post(BASE_URL + 'products', data)
            .then(response => dispatch({ type: ADD_PRODUCTS, payload: response.data }))
            .then(error => dispatch(setError(error.message)))
    } catch (error) {
        dispatch(setError(error.message))
    }
}

export const deleteProducts = (id) => async (dispatch) => {
    dispatch(setLoading());
    try {
        await axios.delete(BASE_URL + 'products/' + id)
            .then((response) => dispatch({ type: DELETE_PRODUCTS, payload: id }))
            .then(error => dispatch(setError(error.message)))
        
    } catch (error) {
        dispatch(setError(error.message))
    }

}

export const editproducts = (data) => async (dispatch) => {
    dispatch(setLoading());
    try {
        await axios.put(BASE_URL + 'products/' + data.id, data)
            .then(response => dispatch({ type: EDIT_PRODUCTS, payload: response.data }))
            .then(error => dispatch(setError(error.message)))
    } catch (error) {
        dispatch(setError(error.message))
    }
}