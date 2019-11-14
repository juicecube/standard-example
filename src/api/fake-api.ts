import { TodoDataInfo } from 'example/redux/index/index';
import { fakeTodoListData, fakeDateListData, fakeUserInfoData, AddUserInfoData } from './fake-data';

const dateListDataSource = fakeDateListData();
const dataSource = fakeTodoListData();
const userInfoDataSource = fakeUserInfoData();
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

// 用户登录
export const login = async(loginData:any) => new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      const res = userInfoDataSource.checker(loginData);
      resolve(res);
    } catch (e) {
      reject(e);
    }
  }, largeDelayTime);
});

// 查询用户信息
export const fetchUserInfo = async(userId:string) => new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      const res = userInfoDataSource.getter(userId);
      resolve(res);
    } catch (e) {
      reject(e);
    }
  }, smallDelayTime);
});

// 用户注册
export const register = async(param:AddUserInfoData) => new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      const res = userInfoDataSource.adder(param);
      resolve(res);
    } catch (e) {
      reject(e);
    }
  }, smallDelayTime);
});