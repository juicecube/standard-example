import { TodoDataInfo } from 'example/redux/index/index';
import { fakeTodoListData, fakeDateListData } from './fake-data';

const dateListDataSource = fakeDateListData();
const dataSource = fakeTodoListData();
const largeDelayTime = 500;
const smallDelayTime = 100;

export interface FetchDateListRes {
  id:string;
  date:string;
}

// 获取日期列表
export const fetchDateList = async() => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(dateListDataSource.getter());
  }, largeDelayTime);
});

// 根据日期获取todoList数据
export const fetchTodoList = async(date:string) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(dataSource.getter(date));
  }, largeDelayTime);
});

// 修改todoList数据
export const upDateTodoList = async(data:TodoDataInfo) => new Promise((resolve, reject) => {
  setTimeout(() => {
    dataSource.setter(data);
    resolve();
  }, smallDelayTime);
});

// 删除todoList数据
export const DleteTodoList = async(id:string) => new Promise((resolve, reject) => {
  setTimeout(() => {
    dataSource.remover(id);
    resolve();
  }, smallDelayTime);
});

// 新增todoList数据
export const AddTodoList = async(date:string) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const newDataSource = dataSource.adder(date);
    resolve(newDataSource);
  }, smallDelayTime);
});