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
  },
});

export const {
  fetch_login,
} = LoginModel.actions;