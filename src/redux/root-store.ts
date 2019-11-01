import {  createStore, applyMiddleware, Middleware, Store } from 'redux';
import { root_reducer, ReduxState } from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import { RootSaga } from './root-saga';

export type StoreType = Store<ReduxState>;

// 创建 saga middleware
const sagaMiddleware = createSagaMiddleware({
  onError: (error: Error) => {
    // 捕获sagas中未被捕获的错误
    console.log('error is', error);
  }
});

export let create_store =  () : Store<ReduxState> => {
  const middlewares:Middleware[] = [sagaMiddleware].filter(Boolean);

  // 注入 saga middleware
  const create_store_with_midddleware = applyMiddleware(
    ...middlewares,
  )(createStore);

  const store:any = create_store_with_midddleware(
    root_reducer,
    DEBUG && (<any>window).__REDUX_DEVTOOLS_EXTENSION__
      && (<any>window).__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return store;
};
export const store = create_store();
sagaMiddleware.run(RootSaga);