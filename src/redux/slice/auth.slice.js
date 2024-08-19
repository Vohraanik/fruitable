import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { setAlert } from "./alert.slice";

const initialState = {
    user: null,
    error: null,
    isLoading: false,
    isLogout: true,
    isLogin: false,
};

export const register = createAsyncThunk(
    'auth/register',
    async (data, thunkAPI) => {
        try {
            const response = await axiosInstance.post('users/register', data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (data, {rejectWithValue,dispatch}) => {
        try {
            const response = await axiosInstance.post('users/login', data);
           if(response.status === 200){
            dispatch(setAlert({color:'success',message:response.data.message}))
            console.log(response.data.data._id);
            localStorage.setItem("_id",response.data.data._id)
            return response.data.data

           }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            dispatch(setAlert({color:'error',message:error.data.message}))
            return rejectWithValue(errorMessage);
        }
    }
);

export const authChecked = createAsyncThunk(
    'auth/authChecked',
    async (data, thunkAPI) => {
        try {
            const response = await axiosInstance.get('users/authChecked');
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


export const logout = createAsyncThunk(
    'auth/logout',
    async (_id, thunkAPI) => {
        console.log(_id);

        try {
            const response = await axiosInstance.post('users/logout', { _id });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        // Register
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.data;
            state.isLoading = false;
            state.isLogout = false;
            state.isLogin = true;
            state.error = null;
        });

        builder.addCase(register.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });

        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        // Login
        builder.addCase(login.fulfilled, (state, action) => {
            console.log(action.payload);
            
            state.user = action.payload;
            state.isLoading = false;
            state.isLogout = false;
            state.isLogin = true;
            state.error = null;
        });

        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });

        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        //logout
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.isLoading = false;
            state.isLogout = true;
            state.isLogin = false;
            state.error = null;
        });
        builder.addCase(authChecked.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isLogout = false;
            state.isLogin = true;
            state.error = null;
            state.user = action.payload.data;
        });
        builder.addCase(authChecked.rejected, (state) => {
            state.user = null;
            state.isLoading = false;
            state.isLogout = true;
            state.isLogin = false;
            state.error = null;
        });

    },
});

export default authSlice.reducer;
