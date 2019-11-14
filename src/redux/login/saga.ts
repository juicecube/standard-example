import { fork, take, call } from 'redux-saga/effects';
import { fetch_login } from './index';
import { login } from 'example/api/fake-api';

export function* loginSaga() {
  yield fork(watchFetchLogin);
}

export function* watchFetchLogin() {
  try {
    const action = yield take(fetch_login);
    const { userName, password, cb } = action.payload;
    const res = yield call(login, { userName, password });
    res && cb && cb(res);
  } catch (e) {
    window.alert(e.message);
  }
}
