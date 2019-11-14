import { call, spawn, all } from 'redux-saga/effects';
import { indexSaga } from 'example/redux/index/saga';
import { loginSaga } from 'example/redux/login/saga';

export function* rootSaga() {
  const sagas = [
    indexSaga,
    loginSaga,
  ];

  yield all(sagas.map((saga) =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    })),
  );
}