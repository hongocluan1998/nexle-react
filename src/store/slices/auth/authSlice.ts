import {
  signUpAccount,
  signInNormal,
  logout,
} from 'store/slices/auth/authThunk';
import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './type';

const initialState: InitialState = {
  userInfo: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signUpAccount.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
    });
    builder.addCase(signInNormal.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
    });
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.userInfo = undefined;
    });
  },
});

export default authSlice.reducer;
