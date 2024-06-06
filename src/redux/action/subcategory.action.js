import axios from 'axios';
import { SUBCATEGORIES_URL } from '../../utils/baseUrl';
import { ADD_SUBCATEGORY, DELETE_SUBCATEGORY, EDIT_SUBCATEGORY, ERROR_SUBCATEGORY, GET_SUBCATEGORY, LOADING_SUBCATEGORY } from '../ActionType';

export const setLoading = () => async (dispatch) => {
    dispatch({ type: LOADING_SUBCATEGORY });
};

export const setError = (error) => async (dispatch) => {
    dispatch({ type: ERROR_SUBCATEGORY, payload: error });
};

export const getSubcategory = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        await axios.get(SUBCATEGORIES_URL + 'list-subcategories')
            .then(response => {
                dispatch({ type: GET_SUBCATEGORY, payload: response.data });
                // console.log(response.data.data);
            })
            .catch(error => {
                dispatch(setError(error.message));
            });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const addSubcategory = (data) => async (dispatch) => {
    dispatch(setLoading());
    console.log(data);
    try {
        await axios.post(SUBCATEGORIES_URL + 'add-subcategories', data)
            .then(response => {
                dispatch({ type: ADD_SUBCATEGORY, payload: response.data});
                console.log(response.data.data);
            })
            .catch(error => {
                dispatch(setError(error.message));
            });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const deletesubcategory = (id) => async (dispatch) => {
    console.log(id);
    dispatch(setLoading());
    try {
        await axios.delete(SUBCATEGORIES_URL + 'delete-subcategories/' + id)
            .then(() => {
                dispatch({ type: DELETE_SUBCATEGORY, payload: id });
            })
            .catch(error => {
                dispatch(setError(error.message));
            });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const editsubcategory = (data) => async (dispatch) => {
    console.log(data);
    dispatch(setLoading());
    try {
        await axios.put(SUBCATEGORIES_URL + 'update-subcategories/' + data._id, data)
            .then(response => {
                dispatch({ type: EDIT_SUBCATEGORY, payload: response.data});
         
            })
            .catch(error => {
                dispatch(setError(error.message));
            });
    } catch (error) {
        dispatch(setError(error.message));
    }
};
