import { ADD_FACILITIES, DELETE_FACILITIES,GET_FACILITIES,LOADING_FACILITIES,UPDATE_FACILITIES } from "../ActionType"


export const setLoading = () => (dispatch) =>{
    dispatch({ type:LOADING_FACILITIES})
}

export const getFacilities = () => (dispatch) =>{
    dispatch({type:GET_FACILITIES})
}

export const addFacilities =(data) => (dispatch) =>{
    dispatch(setLoading())
    setTimeout(()=>[
        dispatch({
            type: ADD_FACILITIES,
            payload: data
        })
    ],2000)

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


