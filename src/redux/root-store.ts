import { createStore, applyMiddleware, Middleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, ReduxState } from './root-reducer';
import { rootSaga } from './root-saga';

export type StoreType = Store<ReduxState>;

// 创建 saga middleware
const sagaMiddleware = createSagaMiddleware({
  onError: (error:Error) => {
    // 捕获sagas中未被捕获的错误
    console.log('error is', error);
  },
});

export const createCustomStore = ():Store<ReduxState> => {
  const middlewares:Middleware[] = [sagaMiddleware].filter(Boolean);

  // 注入 saga middleware
  const createStoreWithMidddleware = applyMiddleware(
    ...middlewares,
  )(createStore);

  const stateStore:any = createStoreWithMidddleware(
    rootReducer,
    DEBUG && (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  );
  return stateStore;
};
export const store = createCustomStore();
sagaMiddleware.run(rootSaga);
