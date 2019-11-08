import { put, call } from 'saga-effects';
import { Api } from 'src/utils/axios';
import { testSaga } from '../../../testing-utils';
import { onEnterProductDetailPage } from './saga';

const product = (productId) => ({ productId });

test(`
  should only save the three recommended products and show ads
  when user enters the product detail page
  given the user is not a VIP
`, async () => {
  const action = { payload: { userId: 233 }};
  const store = { credentials: { vipList: [2333] }};
  const recommendedProducts = [product(1), product(2), product(3), product(4)];
  const firstThreeRecommendations = [product(1), product(2), product(3)];

  // 2. mock api返回值，然后再调用put的时候是保存了正确的数据
  // 通常就是通过action保存到redux中去，put一个action

  Api.get = jest.fn().mockImplementations(() => recommendedProducts);

  // 跑一遍saga，然后不关系执行的次序，只关心重要的事情，哪些东西是需要做的
  await testSaga(onEnterProductDetailPage, action, store);

  // 是否使用了正确的参数
  expect(Api.get).toHaveBeenCalledWith('products/recommended');
  expect(
    actions.importantActionToSaveRecommendedProducts,
  ).toHaveBeenDispatchedWith(firstThreeRecommendations);

  // 3. 主要的业务逻辑，这个业务逻辑是这个用户不是vip所以就调用广告
  // 4. 其他副作用是否发生
  expect(actions.importantActionToFetchAds).toHaveBeenDispatched();
});