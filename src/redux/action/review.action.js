import { BASE_URL } from "../../utils/baseUrl";
import { ADD_REVIEW, GET_REVIEW } from "../ActionType";
import axios from 'axios';

export const addReview = (data) => async (dispatch) => {
    try {
        const response = await axios.post(BASE_URL + 'reviews', data);
        dispatch({ type: ADD_REVIEW, payload: response.data });
    } catch (error) {
        console.log(error);

    }
};

export const getReview = () => async (dispatch) => {
    try {
        const response = await axios.get(BASE_URL + 'reviews');
        dispatch({ type: GET_REVIEW, payload: response.data });
    } catch (error) {
        console.log(error);
    }
}