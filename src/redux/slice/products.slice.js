import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ECOMMERCE_URL } from '../../utils/baseUrl';

const initialState = {
    isLoading: false,
    products: [],
    error: null,
};

export const getproducts = createAsyncThunk(
    'products/get',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(ECOMMERCE_URL+ "products/list-products");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addproducts = createAsyncThunk(
    'products/add',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(ECOMMERCE_URL+'products/add-products', data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }
            });
                console.log(response.data.data);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const editproducts = createAsyncThunk(
    'products/edit',
    async (data, thunkAPI) => {

        try {
            const response = await axios.put(ECOMMERCE_URL+"products/update-products/" + data._id, data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteproducts = createAsyncThunk(
    'products/delete',
    async (id, thunkAPI) => {
        try {
            await axios.delete(ECOMMERCE_URL + "products/delete-products/"+ id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getproducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getproducts.fulfilled, (state, action) => {
                state.products = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getproducts.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(addproducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addproducts.fulfilled, (state, action) => {
                console.log(action.payload);
                state.products.push(action.payload);

                state.isLoading = false;
            })
            .addCase(addproducts.rejected, (state, action) => {

                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(editproducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editproducts.fulfilled, (state, action) => {
                state.products = state.products.map((v) =>
                    v._id == action.payload.data._id ? action.payload.data: v
                );
                state.isLoading = false;
            })
            .addCase(editproducts.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(deleteproducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteproducts.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product._id !== action.payload);
                state.isLoading = false;
            })
            .addCase(deleteproducts.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export default productsSlice.reducer;
