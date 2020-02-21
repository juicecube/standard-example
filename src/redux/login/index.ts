import { createModel, Raw } from 'rdx-model';

export interface LoginSate {
  test:string;
}

const defaultState:LoginSate = {
  test: '',
};

export const LoginModel = createModel({
  state: defaultState,
  reducers: {
    'login/fetchLogin': {
      name: Raw('fetchLogin'),
    },
    'login/fetchRegister': {
      name: Raw('fetchRegister'),
    },
  },
});

export const {
  fetchLogin,
  fetchRegister,
} = LoginModel.actions;
