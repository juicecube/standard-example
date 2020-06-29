import { fork, take, call, put } from 'redux-saga/effects';

import { login, register } from 'example/api/fake-api';
import { storeManage, USER_TOKEN, SESSION } from 'example/utils/storage-manage';
import { updateUserInfo } from '../index';
import { fetchLogin } from './index';

export function* loginSaga() {
  yield fork(watchFetchLogin);
}

export function* watchFetchLogin() {
  try {
    while (true) {
      const action = yield take(fetchLogin);
      yield put(updateUserInfo({ userId: 'fetching' }));
      const { userName, password } = action.payload;
      const account = { userName, password };
      try {
        const res = yield call(login, { userName, password });
        storeManage.set(USER_TOKEN, res.authentication, SESSION);
      } catch(e) {
        if (e.code === 404) {
          yield call(register, { userName, password });
        } else {
          throw new Error('密码错误！');
        }
      }
      yield put(updateUserInfo(account));
      window.browserHistory.push('/');
    }
  } catch (e) {
    yield put(updateUserInfo({ userId: '' }));
    window.alert(e.message);
  }
}
