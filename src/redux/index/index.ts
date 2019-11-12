// 定义actions和reducer
import { createModel, Raw, Action } from 'rdx-model';
import { ReduxState } from '../root-reducer';

export interface UserInfoType {
  userId:string;
  name:string;
  avatar:string;
}

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
// states
export interface IndexState {
  userInfo:UserInfoType;
  dateList:DateListType[];
  todoList:TodoDataInfo[];
  select_date:string;
}

// initial states
export const defaultState:IndexState = {
  userInfo: {
    userId: '',
    name: '未知',
    avatar: '',
  },
  dateList:[],
  todoList:[],
  select_date: '',
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
  update_todo_list,
  update_select_date,
  update_todo_list_data_source,
  delete_todo_list_data_source,
  add_todo_list_data_source,
} = indexModel.actions;
