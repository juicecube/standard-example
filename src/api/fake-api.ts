import { TodoDataInfo } from 'example/redux/index/index';
import { fakeTodoListData, fakeDateListData } from './fake-data';

const dateListDataSource = fakeDateListData();
const dataSource = fakeTodoListData();

export type FetchDateListRes = {
  id:string;
  date:string;
}


// 获取日期列表
export const fetchDateList = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(dateListDataSource.getter());
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