import { ADD_FACILITIES, DELETE_FACILITIES, UPDATE_FACILITIES } from "../ActionType"

export const addFacilities =(data) => (dispatch) =>{

    dispatch({
        type: ADD_FACILITIES,
        payload: data
    })
}

export const deleteFacilities =(id) => (dispatch) =>{
    dispatch({
        type: DELETE_FACILITIES,
        payload: id
    })
}

export const editFacilities =(data) => (dispatch) =>{
    dispatch({
        type: UPDATE_FACILITIES,
        payload: data
    })
}