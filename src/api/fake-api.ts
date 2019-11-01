import { TodoDataInfo } from 'src/redux/index/index';
import { fakeData } from './fake-data';

const dataSource = fakeData();

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
  }, 500);
});

// 根据日期获取todoList数据
export const fetchTodoList = (date:string) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(dataSource.getter(date));
  }, 500);
});

// 修改todoList数据
export const upDateTodoList = (data:TodoDataInfo) => new Promise((resolve, reject) => {
  setTimeout(() => {
    dataSource.setter(data);
    resolve();
  }, 100);
});

// 删除todoList数据
export const DleteTodoList = (id:string) => new Promise((resolve, reject) => {
  setTimeout(() => {
    dataSource.remover(id);
    resolve();
  }, 100);
});

// 新增todoList数据
export const AddTodoList = (date:string) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const newDataSource = dataSource.adder(date);
    resolve(newDataSource);
  }, 100);
});