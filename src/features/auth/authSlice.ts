import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user';

export interface LoginPayload {
  username: string;
  password: string;
}
export interface AuthState {
  isLogin: boolean;
  logging?: boolean;
  user?: User;
}

const initialState: AuthState = {
  isLogin: false,
  logging: false,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.logging = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.logging = false;
      state.isLogin = true;
      state.user = action.payload;
    },
    logginFailure: (state, action: PayloadAction<string>) => {
      state.logging = false;
      state.isLogin = false;
    },
    logout: (state) => {
      state.logging = false;
      state.isLogin = false;
    },
  },
});

//action
export const authActions = authSlice.actions;

//selector
export const selectIsLogin = (state: any) => state.auth.isLogin;
export const selectLogging = (state: any) => state.auth.logging;

//reducer
const authReducers = authSlice.reducer;
export default authReducers;
