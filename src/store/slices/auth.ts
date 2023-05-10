import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { baseURL } from '../../config';
import jwt from 'jwt-decode';

export type userData = {
  uid: number
  login: string,
  first_name: string,
  last_name: string,
  img_url: string|null,
  profile_description: string
}

export interface AuthState {
  authStatus: 'noauth' | 'loading' | 'failed' | 'auth',
  regStatus: 'default' | 'loading' | 'failed' | 'ok'
  authError?: string,
  regError?: string,
  // userData: userData | null
  uid?: string
}

const getInitialState = ():AuthState => {
  const initialState: AuthState = {
    authStatus: 'noauth',
    regStatus: 'default',
    // userData: null
  }

  const token = localStorage.getItem('token')
  if (token) {
    const tokenData = jwt<userData>(token)
    if (
      tokenData.hasOwnProperty('uid') &&
      tokenData.hasOwnProperty('login') &&
      tokenData.hasOwnProperty('first_name') &&
      tokenData.hasOwnProperty('last_name') &&
      tokenData.hasOwnProperty('img_url') &&
      tokenData.hasOwnProperty('profile_description')
    ) {
      initialState.authStatus = 'auth';
      initialState.uid = tokenData.uid.toString();
    }
  }

  return initialState
}

export const login = createAsyncThunk(
  'auth/login',
  async (data:string) => {
    const response = await fetch(baseURL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: data
    });
    return response.json();
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data:string) => await fetch(baseURL + '/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: data
    })
    .then(res => {
      if (res.status != 200) throw new Error(res.status.toString())
      return res.json()
    })
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    logout: () => {
      localStorage.setItem('token', '')
      return getInitialState();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.authStatus = 'loading'; })
      .addCase(login.fulfilled, (state, action) => {
        state.authStatus = 'auth';
        const token = action.payload.token
        state.uid = jwt<userData>(token).uid.toString();
        localStorage.setItem('token', token);
      })
      .addCase(login.rejected, (state) => { state.authStatus = 'failed'; })
      .addCase(registerUser.pending, (state) => { state.regStatus = 'loading' })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.regStatus = 'ok';
        state.authStatus = 'auth';
        const token = action.payload.token
        state.uid = jwt<userData>(token).uid.toString();
        localStorage.setItem('token', token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (action.error.message === '409') state.regError = "Логин занят"
        else state.regError = "Неизвестная ошибка"
        state.regStatus = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;