import { fork, take, call } from 'redux-saga/effects';
import { fetch_login, fetch_register } from './index';
import { login, register } from 'example/api/fake-api';

export function* loginSaga() {
  yield fork(watchFetchLogin);
  yield fork(watchFetchRegister);
}

export function* watchFetchLogin() {
  try {
    while (true) {
      const action = yield take(fetch_login);
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
      const action = yield take(fetch_register);
      const { userName, age, gender, password, cb } = action.payload;
      const res = yield call(register, { userName, age, gender, password });
      res && cb && cb(res);
    }
  } catch (e) {
    window.alert(e.message);
  }
}
