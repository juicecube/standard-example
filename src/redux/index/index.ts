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
  select_date:string;
  userInfo:UserInfo;
}

// initial states
export const defaultState:IndexState = {
  dateList: [],
  todoList: [],
  select_date: '',
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
    'index/fetch_date_list': {
      name: Raw('fetch_date_list'),
    },
    'index/update_date_list': {
      name: Raw('update_date_list'),
      reducer: (state:IndexState, action:Action<DateListType[]>) : IndexState => {
        return { ...state, dateList: (action.payload as []) };
      },
    },
    'index/fetch_user_info': {
      name: Raw('fetch_user_info'),
    },
    'index/update_user_info': {
      name: Raw('update_user_info'),
      reducer: (state:IndexState, action:Action<UserInfo>) : IndexState =>  {
        return { ...state, userInfo: (action.payload as UserInfo) };
      },
    },
    'index/add_todo_list_data_source': {
      name: Raw('add_todo_list_data_source'),
    },
    'index/delete_todo_list_data_source': {
      name: Raw('delete_todo_list_data_source'),
    },
    'index/update_todo_list_data_source': {
      name: Raw('update_todo_list_data_source'),
    },
    'index/update_todo_list': {
      name: Raw('update_todo_list'),
      reducer: (state:IndexState, action:Action<TodoDataInfo[]>) : IndexState => {
        return { ...state, todoList: (action.payload as []) };
      },
    },
    'index/update_select_date': {
      name: Raw('update_select_date'),
      reducer: (state:IndexState, action:Action<string>) : IndexState => {
        return { ...state, select_date: action.payload || '' };
      },
    },
  },
});

// 简单的selector定义在相关的model中
export const selectSelectedDate = (state:ReduxState) => state.indexState.select_date;
export const selectTodoList = (state:ReduxState) => state.indexState.todoList;

export const {
  fetch_date_list,
  update_date_list,
  fetch_user_info,
  update_user_info,
  update_todo_list,
  update_select_date,
  update_todo_list_data_source,
  delete_todo_list_data_source,
  add_todo_list_data_source,
} = indexModel.actions;
