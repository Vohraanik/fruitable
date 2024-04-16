import { createSlice } from '@reduxjs/toolkit'

const intialState = {
    isLoading: false,
    cart: [],
    error: null
}

const cartReducer = createSlice({
    name: "cart",
    initialState: intialState,
    reducers: {
        addCart: (state, action) => {
            console.log(action);
            const index = state.cart.findIndex((v) => v.pid === action.payload)

            if (index !== -1) {
                state.cart[index].qty++
            } else {
                state.cart.push({ pid: action.payload, qty: 1 })
            }
        },
    }
})

export const { addCart } = cartReducer.actions
export default cartReducer.reducer