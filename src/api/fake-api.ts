
export type FetchDateListRes = {
  id:string;
  date:string;
}


// 获取日期列表
export const fetchDateList = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([
      {
        id: '123pp',
        date: '2019-10-31',
      },
      {
        id: '123uu',
        date: '2019-11-01',
      }
    ])
  }, 1000);
});

// 根据日期获取todoList数据
export const fetchTodoList = (date:string) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([
      {
        id: 'ssssss',
        date: date,
        isFinished: true,
        overview: '挣他一个亿',
      },
      {
        id: 'ssssss',
        date: date,
        isFinished: false,
        overview: '买个布加迪威龙',
        details: '下午4：00飞美利坚洛杉矶，买辆布加迪威龙空运回来',
      }
    ])
  }, 1000);
});