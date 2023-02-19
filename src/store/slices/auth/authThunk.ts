import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance, noLoginInstance } from 'services/api/axios';
import { SignInData, SignUpData } from 'types/Auth';

export const signUpAccount = createAsyncThunk(
  'auth/sign-up',
  async (request: SignUpData, { rejectWithValue }) => {
    try {
      const response = await noLoginInstance.post('auth/signup', request);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const signInNormal = createAsyncThunk(
  'auth/sign-in',
  async (request: SignInData, { rejectWithValue }) => {
    try {
      const response = await noLoginInstance.post('auth/signin', request);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (request: undefined, { rejectWithValue }) => {
    try {
      const response = await instance.post('auth/logout');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);
