import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginSate {
  test:string;
}

const defaultState:LoginSate = {
  test: '',
};

export const LoginModel = createSlice({
  name: 'login',
  initialState: defaultState,
  reducers: {
    fetchLogin: (state) => state,
    fetchRegister: (state) => state,
  },
});

export const {
  fetchLogin,
  fetchRegister,
} = LoginModel.actions;
