import { expectSaga } from 'redux-saga-test-plan';
import { watchFetchDateList, watchFetchTodoList } from 'example/redux/index/saga';
import { fetchDateList, fetchTodoList } from 'example/api/fake-api';
import { call, select } from 'redux-saga/effects';
import { ReduxState } from 'example/redux/root-reducer';
import { TodoModel, updateSelectDate, updateTodoList, TodoDataInfo, selectSelectedDate, defaultState, fetchDateListAction, updateDateList } from 'example/redux/index/index';

describe('sagas test', () => {
  test('watchFetchDateList saga run right', () => {
    const fakeDateList = [{ date: '2019-10-31', id: '123pp' }];
    return expectSaga(watchFetchDateList)
      .dispatch(fetchDateListAction())
      .provide([
        [call(fetchDateList), fakeDateList],
      ])
      .withReducer(TodoModel.reducer)
      // .hasFinalState({
      //   dateList: [{ date: '2019-10-31', id: '123pp', isToday: false }],
      // })
      .put(updateDateList([{ date: '2019-10-31', id: '123pp', isToday: false }]))
      .run();
  });
  test('watchFetchTodoList run right', () => {
    const store:ReduxState = {
      indexState: { ...defaultState, selectDate: '2019-11-11' },
      LoginSate: { test: '' },
    };
    const fakeTodoList:TodoDataInfo[] = [{ id: 'jjj', date: '2019-11-11', isFinished: false, overview: 'new day', details: 'hello' }];
    return expectSaga(watchFetchTodoList)
      .dispatch(updateSelectDate('jjj'))
      .provide([
        [select(selectSelectedDate), selectSelectedDate(store)],
        [call(fetchTodoList, selectSelectedDate(store)), fakeTodoList],
      ])
      .put(updateTodoList(fakeTodoList))
      .run();
  });
});
// describe('reducers test', () => {

// });
// describe('selectors test', () => {

// });
