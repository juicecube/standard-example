import { put, fork, take, call, select } from 'redux-saga/effects';
import { fetch_date_list, update_date_list, update_select_date,  update_todo_list, selectSelectedDate  } from './index';
import { fetchDateList, fetchTodoList } from 'src/api/fake-api';
import { handleDateListRes, handleTodoListRes } from './utils';
export function* IndexSaga() {
  yield fork(watchFetchDateList);
  yield fork(watchFetchTodoList);
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
    yield take(update_select_date);
    const selectedDate = yield select(selectSelectedDate);
    const res = yield call(fetchTodoList, selectedDate);
    // const handledRes = handleTodoListRes(res);
    yield put(update_todo_list(res));
  } catch (error) {
    console.log(error);
  }
}

