import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl"




const initialState = {
    isLoading:false,
    coupons:[],
    error:null
}

export const addCoupons = createAsyncThunk (
    'coupons/add',
    async (data)=>{
      try {
        const response = await axios.post(BASE_URL +'coupons',data)
        console.log(response.data);
        return response.data
      } catch (error) {
        return error.massage
      }
    }
)

export const getCoupons = createAsyncThunk (
    'coupons/get',
    async()=>{
        try {
            const response = await axios.get(BASE_URL +'coupons')
            return response.data
        } catch (error) {
            return error.massage
        }
    }
)

export const deleteCoupons = createAsyncThunk (
    'coupons/delete',
    async(id)=>{
        try {
            const response = await axios.delete(BASE_URL +'coupons/'+id)
            return response.data.id
        } catch (error) {
            return error.massage
        }
    }
)

const couponsSlice = createSlice ({
    name:'coupons',
    initialState,
    reducers:{

    },
    extraReducers:(builder) => {
        builder.addCase(addCoupons.fulfilled, (state, action) => {
            console.log(action);
            state.coupons= state.coupons.concat(action.payload);
            
        })

        builder.addCase(getCoupons.fulfilled, (state, action) => {
            console.log(action);
            state.coupons = action.payload
        })

        builder.addCase(deleteCoupons.fulfilled, (state, action) => {
            console.log(action);
            const index = state.coupons.findIndex((v) => v.id === action.payload)
            if (index !== -1) {
                state.coupons.splice(index, 1)
            }
        })

    }
})

export default couponsSlice.reducer
