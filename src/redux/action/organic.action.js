
import axios from 'axios';
import { BASE_URL } from '../../utils/baseUrl';
import { ADD_ORGANIC, DELETE_ORGANIC, EDIT_ORGANIC, ERROR_ORGANIC, GET_ORGANIC, LOADING_ORGANIC,  } from '../ActionType';


export const setLoading = () => async(dispatch) =>{
    dispatch({type:LOADING_ORGANIC})
}

export const setError = (error) => async(dispatch) =>{
    dispatch({type:ERROR_ORGANIC,payload:error})
}

export const getData = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        await axios.get(BASE_URL + 'fruits')
            .then(response => dispatch({ type: GET_ORGANIC, payload: response.data }))
            .then(error =>  dispatch(setError(error.message)))
    } catch (error) {
            dispatch(setError(error.message))
    }
}

export const addData = (data) => async (dispatch) => {
    dispatch(setLoading());
    try {
        await axios.post(BASE_URL + 'fruits', data)
            .then(response => dispatch({ type: ADD_ORGANIC, payload: response.data }))
            .then(error => dispatch(setError(error.message)))
    } catch (error) {
        dispatch(setError(error.message))
    }
}

export const deleteData = (id) => async (dispatch) => {
    dispatch(setLoading());
    try {
        await axios.delete(BASE_URL + 'fruits/' + id)
            .then((response) => dispatch({ type: DELETE_ORGANIC, payload: id }))
            .then(error => dispatch(setError(error.message)))
        
    } catch (error) {
        dispatch(setError(error.message))
    }

}

export const editData = (data) => async (dispatch) => {
    dispatch(setLoading());
    try {
        await axios.put(BASE_URL + 'fruits/' + data.id, data)
            .then(response => dispatch({ type: EDIT_ORGANIC, payload: response.data }))
            .then(error => dispatch(setError(error.message)))
    } catch (error) {
        dispatch(setError(error.message))
    }
}