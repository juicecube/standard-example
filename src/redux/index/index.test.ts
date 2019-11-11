import { expectSaga } from 'redux-saga-test-plan';
import { watchFetchDateList, watchFetchTodoList } from './saga';
import { fetchDateList, fetchTodoList } from 'example/api/fake-api';
import { call, select } from 'redux-saga/effects';
import { ReduxState } from 'example/redux/root-reducer';
import { indexModel, update_select_date, update_todo_list, TodoDataInfo, selectSelectedDate, defaultState, fetch_date_list, update_date_list } from './index';

// 不关注顺序，只测试关键业务节点
// 1. 是否是使用了正确的参数 通常是从 action payload 或 redux 中来）
describe('sagas test', () => {
  test('watchFetchDateList saga run right', () => {
    const fakeDateList = [{ date: '2019-10-31', id: '123pp' }];
    return expectSaga(watchFetchDateList)
      // 2. 测试mock api的返回，检测是否保存了正确的数据，通常就是通过action保存到redux中
      .dispatch(fetch_date_list())
      // provider和matchers is a tool to mock api return
      .provide([
        // call是saga中的call，call一个promise请求，第二个参数是这个请求返回的mock数据
        // matchers是什么，matchers和provide提供的功能应该是一样的
        [call(fetchDateList), fakeDateList],
      ])
      // 这个reducer调用了之后后，可以对比state的值是否是符合预期的
      // 直接测试reducer
      .withReducer(indexModel.reducers['index/update_date_list'])
      .hasFinalState({
        dateList:[{ date: '2019-10-31', id: '123pp', isToday: false }],
      })
      // 测试是否正确调用put这个effect
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
      // .withState(indexState)
      // 这个方法只是模拟了select，但是没有办法测试这个selector是否正确
      // 测试selector
      // 需不需要测试selector，好像是不需要的
      .provide([
        [select(selectSelectedDate), selectSelectedDate(store)],
        [call(fetchTodoList, selectSelectedDate(store)), fakeTodoList],
      ])
      .put(update_todo_list(fakeTodoList))
      .run();
  });
});
describe('reducers test', () => {

});
describe('selectors test', () => {

});
