import { put, fork, take, call, select } from 'redux-saga/effects';
import {
  fetch_date_list,
  update_date_list,
  update_select_date,
  update_todo_list,
  selectSelectedDate,
  update_todo_list_data_source,
  delete_todo_list_data_source,
  add_todo_list_data_source,
  TodoDataInfo
} from './index';
import { fetchDateList, fetchTodoList, upDateTodoList, DleteTodoList, AddTodoList } from 'example/api/fake-api';
import { handleDateListRes } from './utils';

export function* IndexSaga() {
  yield fork(watchFetchDateList);
  yield fork(watchFetchTodoList);
  yield fork(watchUpdateTodoListDataSource);
  yield fork(watchDeleteTodoListDataSource);
  yield fork(watchAddTodoListDataSource);
}

function* watchFetchDateList() {
  try {
    yield take(fetch_date_list);
    const res = yield call(fetchDateList);
    const handledRes = handleDateListRes(res);
    yield put(update_date_list(handledRes));
  } catch (error) {
    console.log(error);
  }
}

function* watchFetchTodoList() {
  try {
    while(true) {
      yield take(update_select_date);
      console.log('watchFetchTodoList');
      const selectedDate = yield select(selectSelectedDate);
      console.log('selectedDate', selectedDate);
      const res = yield call(fetchTodoList, selectedDate);
      console.log('todoList', res);
      yield put(update_todo_list(res));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchUpdateTodoListDataSource () {
  try {
    while(true) {
      const action =  yield take(update_todo_list_data_source);
      const newData = action.payload;
      console.log('watchUpdateTodoListDataSource', newData);
      yield call(upDateTodoList, newData as TodoDataInfo);
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchDeleteTodoListDataSource () {
  try {
    while(true) {
      const action =  yield take(delete_todo_list_data_source);
      const newData = action.payload;
      console.log('watchDeleteTodoListDataSource', newData);
      yield call(DleteTodoList, newData as string);
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchAddTodoListDataSource () {
  try {
    while(true) {
      const action = yield take(add_todo_list_data_source);
      const date = action.payload;
      const newTodoListDataSource = yield call(AddTodoList, date);
      console.log('newTodoListDataSource', newTodoListDataSource);
      yield put(update_todo_list(newTodoListDataSource));
    }
  } catch (error) {
    console.log(error);
  }
}



