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
    'login/fetch_login': {
      name: Raw('fetch_login'),
    },
    'login/fetch_register': {
      name: Raw('fetch_register'),
    },
  },
});

export const {
  fetch_login,
  fetch_register,
} = LoginModel.actions;