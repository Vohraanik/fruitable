import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl"

const initialState = {
    isLoading: false,
    coupons: [],
    error: null
}

export const addCoupons = createAsyncThunk(
    'coupons/add',
    async (data) => {
        try {
            const response = await axios.post(BASE_URL + 'coupons', data)
            console.log(response.data);
            return response.data
        } catch (error) {
            return error.massage
        }
    }
)

export const getCoupons = createAsyncThunk(
    'coupons/get',
    async () => {
        try {
            const response = await axios.get(BASE_URL + 'coupons')
            return response.data
        } catch (error) {
            return error.massage
        }
    }
)

export const deleteCoupons = createAsyncThunk(
    'coupons/delete',
    async (id) => {
        try {
            await axios.delete(BASE_URL + 'coupons/' + id)
            return id
        } catch (error) {
            return error.massage
        }
    }
)

export const editCoupons = createAsyncThunk(
    'coupons/edit',
    async (data) => {
        try {
            const response = await axios.put(BASE_URL + 'coupons/' + data.id, data)
            return response.data
        } catch (error) {
            return error.massage
        }
    }
)

const couponsSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(addCoupons.fulfilled, (state, action) => {
            console.log(action);
            state.coupons = state.coupons.concat(action.payload);

        })

        builder.addCase(getCoupons.fulfilled, (state, action) => {
            console.log(action);
            state.coupons = action.payload
        })

        builder.addCase(deleteCoupons.fulfilled, (state, action) => {
            console.log(action);
            state.coupons = state.coupons.filter((v) => v.id !== action.payload);
        })

        builder.addCase(editCoupons.fulfilled, (state, action) => {
            console.log(action);
            state.coupons = state.coupons.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v
                }
            })
        })

    }
})

export default couponsSlice.reducer