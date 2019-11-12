import { expectSaga } from 'redux-saga-test-plan';
import { watchFetchDateList, watchFetchTodoList } from './saga';
import { fetchDateList, fetchTodoList } from 'example/api/fake-api';
import { call, select } from 'redux-saga/effects';
import { ReduxState } from 'example/redux/root-reducer';
import { indexModel, update_select_date, update_todo_list, TodoDataInfo, selectSelectedDate, defaultState, fetch_date_list, update_date_list } from './index';

describe('sagas test', () => {
  test('watchFetchDateList saga run right', () => {
    const fakeDateList = [{ date: '2019-10-31', id: '123pp' }];
    return expectSaga(watchFetchDateList)
      .dispatch(fetch_date_list())
      .provide([
        [call(fetchDateList), fakeDateList],
      ])
      .withReducer(indexModel.reducers['index/update_date_list'])
      .hasFinalState({
        dateList:[{ date: '2019-10-31', id: '123pp', isToday: false }],
      })
      .put(update_date_list([{ date: '2019-10-31', id: '123pp', isToday: false }]))
      .run();
  });
  test('watchFetchTodoList run right', () => {
    const store:ReduxState = {
      indexState: { ...defaultState, select_date: '2019-11-11' },
    };
    const fakeTodoList:TodoDataInfo[] = [{ id: 'jjj', date: '2019-11-11', isFinished: false, overview: 'new day', details: 'hello' }];
    return expectSaga(watchFetchTodoList)
      .dispatch(update_select_date())
      .provide([
        [select(selectSelectedDate), selectSelectedDate(store)],
        [call(fetchTodoList, selectSelectedDate(store)), fakeTodoList],
      ])
      .put(update_todo_list(fakeTodoList))
      .run();
  });
});
// describe('reducers test', () => {

// });
// describe('selectors test', () => {

// });
