// 定义actions和reducer
import { createModel, Raw, Action } from 'rdx-model';
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

// Action && Reducer
export const indexModel = createModel({
  state: defaultState,
  reducers: {
    'index/fetchDateListAction': {
      name: Raw('fetchDateListAction'),
    },
    'index/updateDateList': {
      name: Raw('updateDateList'),
      reducer: (state:IndexState, action:Action<DateListType[]>):IndexState => ({ ...state, dateList: (action.payload as []) }),
    },
    'index/fetchUserInfoAction': {
      name: Raw('fetchUserInfoAction'),
    },
    'index/updateUserInfo': {
      name: Raw('updateUserInfo'),
      reducer: (state:IndexState, action:Action<UserInfo>):IndexState => ({ ...state, userInfo: (action.payload as UserInfo) }),
    },
    'index/addTodoListDataSource': {
      name: Raw('addTodoListDataSource'),
    },
    'index/deleteTodoListDataSource': {
      name: Raw('deleteTodoListDataSource'),
    },
    'index/updateTodoListDataSource': {
      name: Raw('updateTodoListDataSource'),
    },
    'index/updateTodoList': {
      name: Raw('updateTodoList'),
      reducer: (state:IndexState, action:Action<TodoDataInfo[]>):IndexState => ({ ...state, todoList: (action.payload as []) }),
    },
    'index/updateSelectDate': {
      name: Raw('updateSelectDate'),
      reducer: (state:IndexState, action:Action<string>):IndexState => ({ ...state, selectDate: action.payload || '' }),
    },
  },
});

// 简单的selector定义在相关的model中
export const selectSelectedDate = (state:ReduxState) => state.indexState.selectDate;
export const selectTodoList = (state:ReduxState) => state.indexState.todoList;

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
} = indexModel.actions;
