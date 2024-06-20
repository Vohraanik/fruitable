import { createSlice } from '@reduxjs/toolkit'

const intialState = {
    isLoading: false,
    cart: [],
    error: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState: intialState,
    reducers: {
        addCart: (state, action) => {
            console.log(action.payload);
          const index = state.cart.findIndex((v) => v.pid === action.payload.id)
            if (index !== -1) {
                state.cart[index].qty+= action.payload.count
            } else {
                state.cart.push({ pid: action.payload.id, qty: action.payload.count })
            }
        },
        incrementQty: (state, action) => {
            console.log(action.payload);
            const index = state.cart.findIndex((v) => v.pid === action.payload)

            if (index !== -1) {
                state.cart[index].qty++
            }

        },

        decrimentQty: (state, action) => {
            console.log(action.payload);
            const index = state.cart.findIndex((v) => v.pid === action.payload)
                if (state.cart[index].qty > 1) {
                    state.cart[index].qty--
                } 
        

        },
        removeCart: (state, action) => {
            const fData = state.cart.filter((v) => v.pid !== action.payload)
            state.cart = fData
        //     const index = state.cart.findIndex((v) => v.pid === action.payload)
        //     if (index !== -1) {
        //         state.cart.splice(index, 1)
        //     }
        },
    }
})

export const { addCart, incrementQty, decrimentQty ,removeCart} = cartSlice.actions
export default cartSlice.reducer