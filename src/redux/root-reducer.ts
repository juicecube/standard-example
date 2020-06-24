import { combineReducers } from '@reduxjs/toolkit';
import { LoginSate, LoginModel } from './login';
import { IndexState, TodoModel } from './index';

export type ReduxState = Readonly<{
  indexState:IndexState;
  LoginSate:LoginSate;
}>;

export const rootReducer = combineReducers<ReduxState>({
  indexState: TodoModel.reducer,
  LoginSate: LoginModel.reducer,
});
