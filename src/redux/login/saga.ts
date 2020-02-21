import { fork, take, call } from 'redux-saga/effects';
import { login, register } from 'example/api/fake-api';
import { fetchLogin, fetchRegister } from './index';

export function* loginSaga() {
  yield fork(watchFetchLogin);
  yield fork(watchFetchRegister);
}

export function* watchFetchLogin() {
  try {
    while (true) {
      const action = yield take(fetchLogin);
      const { userName, password, cb } = action.payload;
      const res = yield call(login, { userName, password });
      res && cb && cb(res);
    }
  } catch (e) {
    window.alert(e.message);
  }
}

export function* watchFetchRegister() {
  try {
    while (true) {
      const action = yield take(fetchRegister);
      const { userName, age, gender, password, cb } = action.payload;
      const res = yield call(register, { userName, age, gender, password });
      res && cb && cb(res);
    }
  } catch (e) {
    window.alert(e.message);
  }
}
