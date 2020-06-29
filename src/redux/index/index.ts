// 定义actions和reducer
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import { ReduxState } from '../root-reducer';

export interface DateListType {
  id:string;
  date:string;
  isToday:boolean;
}

export interface TodoDataInfo {
  id:string;
  date:string;
  isFinished:boolean;
  overview:string;
  details?:string;
}

export interface UserInfo {
  userName:string;
  userId:string;
  avatar:string;
  age:number;
  gender:'M'|'W'|'';
  [key:string]:any;
}

// states
export interface IndexState {
  dateList:DateListType[];
  todoList:TodoDataInfo[];
  selectDate:string;
  userInfo:UserInfo;
}

// initial states
export const defaultState:IndexState = {
  dateList: [],
  todoList: [],
  selectDate: '',
  userInfo: {
    userName: '',
    userId: '',
    avatar: '',
    age: 0,
    gender: '',
  },
};

export const TodoModel = createSlice({
  name: 'todo',
  initialState: defaultState,
  reducers: {
    fetchDateListAction: (state) => state,
    fetchUserInfoAction: (state) => state,
    addTodoListDataSource: (state, action:PayloadAction<string>) => state,
    deleteTodoListDataSource: (state, action:PayloadAction<string>) => state,
    updateTodoListDataSource: (state, action:PayloadAction<TodoDataInfo>) => state,
    updateDateList: (state:IndexState, action:PayloadAction<DateListType[]>):IndexState => {
      state.dateList = action.payload;
      return state;
    },
    updateUserInfo: (state:IndexState, action:PayloadAction<Partial<UserInfo>>):IndexState => {
      state.userInfo = { ...state.userInfo, ...action.payload };
      return state;
    },
    updateTodoList: (state:IndexState, action:PayloadAction<TodoDataInfo[]>):IndexState => {
      state.todoList = action.payload;
      return state;
    },
    updateSelectDate: (state:IndexState, action:PayloadAction<string>):IndexState => {
      state.selectDate = action.payload;
      return state;
    },
  },
});

// 简单的selector定义在相关的model中
export const selectSelectedDate = (state:ReduxState) => state.indexState.selectDate;
export const selectTodoList = (state:ReduxState) => state.indexState.todoList;
export const selectUserInfo = createSelector(
  (state:ReduxState) => {
    console.log(state);
    return state.indexState;
  },
  (indexState) => indexState.userInfo,
);

export const {
  fetchDateListAction,
  updateDateList,
  fetchUserInfoAction,
  updateUserInfo,
  updateTodoList,
  updateSelectDate,
  updateTodoListDataSource,
  deleteTodoListDataSource,
  addTodoListDataSource,
} = TodoModel.actions;
