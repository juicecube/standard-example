import { call, spawn, all } from 'redux-saga/effects';
import { IndexSaga } from 'example/redux/index/saga';

export function* RootSaga() {
  const sagas = [
    IndexSaga,
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