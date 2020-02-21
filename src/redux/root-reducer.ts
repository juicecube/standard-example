import { combineReducers } from 'redux';
import { LoginSate, LoginModel } from './login';
import { IndexState, indexModel } from './index';

export type ReduxState = Readonly<{
    indexState:IndexState;
    LoginSate:LoginSate;
}>;

export const rootReducer = combineReducers<ReduxState>({
  indexState: indexModel.reducer,
  LoginSate: LoginModel.reducer,
});
