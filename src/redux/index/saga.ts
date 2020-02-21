import { put, fork, take, call, select } from 'redux-saga/effects';
import { fetchDateList, fetchTodoList, upDateTodoList, DleteTodoList, AddTodoList, fetchUserInfo } from 'example/api/fake-api';
import { storeManage, USER_ID, SESSION } from 'example/utils/storage-manage';
import { handleDateListRes } from './utils';
import {
  fetchDateListAction,
  updateDateList,
  fetchUserInfoAction,
  updateUserInfo,
  updateSelectDate,
  updateTodoList,
  selectSelectedDate,
  updateTodoListDataSource,
  deleteTodoListDataSource,
  addTodoListDataSource,
  TodoDataInfo,
} from './index';

export function* indexSaga() {
  yield fork(watchFetchUserInfo);
  yield fork(watchFetchDateList);
  yield fork(watchFetchTodoList);
  yield fork(watchUpdateTodoListDataSource);
  yield fork(watchDeleteTodoListDataSource);
  yield fork(watchAddTodoListDataSource);
}

export function* watchFetchDateList() {
  try {
    while (true) {
      yield take(fetchDateListAction);
      const res = yield call(fetchDateList);
      const handledRes = handleDateListRes(res);
      yield put(updateDateList(handledRes));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchFetchUserInfo() {
  try {
    while (true) {
      yield take(fetchUserInfoAction);
      const userId = storeManage.get(USER_ID, SESSION);
      const res = yield call(fetchUserInfo, userId);
      console.log('watchFetchUserInfo', res);
      yield put(updateUserInfo(res));
    }
  } catch (error) {
    window.alert(error.message || 'fetch error');
  }
}

export function* watchFetchTodoList() {
  try {
    while (true) {
      yield take(updateSelectDate);
      const selectedDate = yield select(selectSelectedDate);
      const res = yield call(fetchTodoList, selectedDate);
      yield put(updateTodoList(res));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchUpdateTodoListDataSource() {
  try {
    while (true) {
      const action = yield take(updateTodoListDataSource);
      const newData = action.payload;
      yield call(upDateTodoList, newData as TodoDataInfo);
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchDeleteTodoListDataSource() {
  try {
    while (true) {
      const action = yield take(deleteTodoListDataSource);
      const newData = action.payload;
      yield call(DleteTodoList, newData as string);
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchAddTodoListDataSource() {
  try {
    while (true) {
      const action = yield take(addTodoListDataSource);
      const date = action.payload;
      const newTodoListDataSource = yield call(AddTodoList, date);
      console.log('newTodoListDataSource', newTodoListDataSource);
      yield put(updateTodoList(newTodoListDataSource));
    }
  } catch (error) {
    console.log(error);
  }
}
