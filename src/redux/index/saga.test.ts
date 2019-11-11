import { expectSaga } from 'redux-saga-test-plan';
import { watchFetchDateList } from './saga';
import { fetchDateList } from 'example/api/fake-api';
import { call } from 'redux-saga/effects';
import { indexModel } from './index';

// 测试一个简单的请求的saga
// 如果不传入mock的异步的函数的返回值，那么就没有办法测试下一步put是否是正确的

// 测试saga主要有两大类型一种是按照saga执行的顺序来写，这种有一点重复写saga的感觉
// 还有一种是测试业务关键节点，不关注执行顺序和内部细节
// 还需要想清楚一个事情测试saga到底是需要测试哪些内容

// 不关注顺序，只测试关键业务节点
// 1. 是否是使用了正确的参数 通常是从 action payload 或 redux 中来）
test('api call right', () => {
  const fakeDateList = [{ date: '2019-10-31', id: '123pp' }];
  return expectSaga(watchFetchDateList)
    // 2. 测试mock api的返回，检测是否保存了正确的数据，通常就是通过action保存到redux中
    .dispatch({ type: 'index/fetch_date_list' })
    // provider和matchers is a tool to mock api return
    .provide([
      // call是saga中的call，call一个promise请求，第二个参数是这个请求返回的mock数据
      // matchers是什么，matchers和provide提供的功能应该是一样的
      [call(fetchDateList), fakeDateList],
    ])
    // .call(fakeDateListData)
    // put的时候可能是一个action调用reducer
    // 这个reducer调用了之后后，可以对比state的值是否是符合预期的
    // update_date_list这个reducer如何拿到
    // 直接测试reducer
    // 而不是测试put这个effect
    .withReducer(indexModel.reducers['index/update_date_list'])
    .hasFinalState({
      dateList:[{ date: '2019-10-31', id: '123pp', isToday: false }],
    })
    // .put({
    //   type: 'index/update_date_list',
    //   payload: [{ date: '2019-10-31', id: '123pp', isToday: false }],
    // })
    .run();
});
