import { combineReducers } from 'redux';
import { IndexState, indexModel } from './index';
import { LoginSate, LoginModel } from './login';

export type ReduxState = Readonly<{
    indexState:IndexState;
    LoginSate:LoginSate;
}>;

export const rootReducer = combineReducers<ReduxState>({
    indexState: indexModel.reducer,
    LoginSate: LoginModel.reducer,
});