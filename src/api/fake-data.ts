import { TodoDataInfo } from 'src/redux/index/index';
import { upDateObjectValue } from 'src/utils/index';

const getNewDefaultTodoListItemData = (date:string) => {
  const uuid = new Date().getTime() + '';
  const newDefaultTodoListItemData:TodoDataInfo = {
    id: uuid,
    date: date,
    isFinished: false,
    overview: '默认文案',
  }
  return newDefaultTodoListItemData;
}

export const fakeData = () => {
  let data:TodoDataInfo[] = [
    {
      id: 'ssssss',
      date: '2019-10-31',
      isFinished: true,
      overview: '挣他一个亿',
    },
    {
      id: 'dddddd',
      date: '2019-10-31',
      isFinished: false,
      overview: '买个布加迪威龙',
      details: '下午4：00飞美利坚洛杉矶，买辆布加迪威龙空运回来',
    },
    {
      id: 'ffffffff',
      date: '2019-11-01',
      isFinished: false,
      overview: '度个假',
      details: '中国，新加坡，印度尼西亚',
    },
    {
      id: 'ggggggg',
      date: '2019-11-01',
      isFinished: true,
      overview: '吃饭',
      details: '火锅？ 烤肉？ 海底捞？',
    },
    {
      id: 'hhhhhhh',
      date: '2019-11-01',
      isFinished: false,
      overview: '看电影',
      details: '喜剧？恐怖片？动作？悬疑？',
    },

  ];
  return({
    getter: (date:string) => {
      return data.filter((item) => item.date === date);
    },
    setter: (newData:TodoDataInfo) => {
      const handledData = upDateObjectValue({
        sourceObjectArray: data,
        key: 'id',
        newItem: newData,
      });
      data = handledData as TodoDataInfo[];
    },
    remover: (id:string) => {
      const handledData = data.filter((item) => item.id !== id);
      data = handledData;
    },
    adder: (date:string) => {
      const newTodoListItem = getNewDefaultTodoListItemData(date);
      data.push(newTodoListItem);
      return data.filter((item) => item.date === date);
    }
  });
}