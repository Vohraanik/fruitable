import { createSlice } from "@reduxjs/toolkit"

const intialState = {
    isLoading: false,
    copuns: [],
    error: null
}

const  copunsReducer = createSlice({
    name: "copuns",
    initialState: intialState,
    reducers: {
        addCopuns: (state, action) => {
            state.copuns = action.payload
        }

    }
})


export const { addCopuns } = copunsReducer.actions
export default copunsReducer.reducer