import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: '',
  color: ''
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.message = action.payload.message;
      state.color = action.payload.color;
    },
    resetAlert: (state) => {
      state.message = '';
      state.color = '';
    }
  }
});


export const { setAlert, resetAlert } = alertSlice.actions;


export default alertSlice.reducer;
