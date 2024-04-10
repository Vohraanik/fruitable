
import axios from 'axios';
import { BASE_URL } from '../../utils/baseUrl';
import { ADD_ORGANIC, DELETE_ORGANIC, EDIT_ORGANIC, GET_ORGANIC } from '../ActionType';

export const getData = () => async (dispatch) => {
    try {
        await axios.get(BASE_URL + 'fruits')
            .then(response => dispatch({ type: GET_ORGANIC, payload: response.data }))
            .then(error => console.log(error))
    } catch (error) {
        console.log(error);
    }
}

export const addData = (data) => async (dispatch) => {
    try {
        await axios.post(BASE_URL + 'fruits', data)
            .then(response => dispatch({ type: ADD_ORGANIC, payload: response.data }))
            .then(error => console.log(error))
    } catch (error) {

    }
}

export const deleteData = (id) => async (dispatch) => {

    try {
        await axios.delete(BASE_URL + 'fruits/' + id)
            .then((response) => dispatch({ type: DELETE_ORGANIC, payload: id }))
            .then(error => console.log(error))
        
    } catch (error) {
        
    }

}

export const editData = (data) => async (dispatch) => {
    try {
        await axios.put(BASE_URL + 'fruits/' + data.id, data)
            .then(response => dispatch({ type: EDIT_ORGANIC, payload: response.data }))
            .then(error => console.log(error))
    } catch (error) {
        console.log(error);
    }
}