import { combineReducers } from 'redux';
import { IndexState, indexModel } from './index';

export type ReduxState = Readonly<{
    indexState:IndexState;
}>;

export const rootReducer = combineReducers<ReduxState>({
    indexState: indexModel.reducer,
});