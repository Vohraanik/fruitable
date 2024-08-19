import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ECOMMERCE_URL } from '../../utils/baseUrl';

const initialState = {
    isLoading: false,
    variants: [],
    error: null,
};

export const getVariants = createAsyncThunk(
    'variants/get',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(ECOMMERCE_URL + "varients/list-varients");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addVariant = createAsyncThunk(
    'variants/add',
    async (data, thunkAPI) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            const response = await axios.post(ECOMMERCE_URL + 'varients/add-varients', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const editVariant = createAsyncThunk(
    'variants/edit',
    async (data, thunkAPI) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            const response = await axios.put(ECOMMERCE_URL + "varients/update-varients/" + data._id, formData, {
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

export const deleteVariant = createAsyncThunk(
    'variants/delete',
    async (id, thunkAPI) => {
        try {
            await axios.delete(ECOMMERCE_URL + "varients/delete-varients/" + id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const variantsSlice = createSlice({
    name: 'variants',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getVariants.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getVariants.fulfilled, (state, action) => {
                state.variants = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getVariants.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(addVariant.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addVariant.fulfilled, (state, action) => {
                state.variants.push(action.payload);
                state.isLoading = false;
            })
            .addCase(addVariant.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(editVariant.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editVariant.fulfilled, (state, action) => {
                state.variants = state.variants.map((v) =>
                    v._id === action.payload.data._id ? action.payload.data : v
                );
                state.isLoading = false;
            })
            .addCase(editVariant.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(deleteVariant.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteVariant.fulfilled, (state, action) => {
                state.variants = state.variants.filter((variant) => variant._id !== action.payload);
                state.isLoading = false;
            })
            .addCase(deleteVariant.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export default variantsSlice.reducer;
