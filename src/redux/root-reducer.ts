import { combineReducers } from 'redux';
import { IndexState, index_model } from './index';

export type ReduxState = Readonly<{
    indexState:IndexState;
}>;

export const root_reducer = combineReducers<ReduxState>({
    indexState: index_model.reducer,
});