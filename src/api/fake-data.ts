import { superDate } from '@mlz/super-utils';
import { TodoDataInfo } from 'example/redux/index/index';
import { upDateObjectArrayValue } from 'example/utils/index';
import { storeManage, TODO_LIST_DATA, DATE_LIST_DATA, USER_INFO_DATA, LOCAL, SESSION } from 'example/utils/storage-manage';

export const todayDateStr = superDate.format(new Date().getTime(), 'yyyy-mm-dd');

const getNewDefaultTodoListItemData = (date:string) => {
  const uuid = new Date().getTime() + '';
  const newDefaultTodoListItemData:TodoDataInfo = {
    id: uuid,
    date,
    isFinished: false,
    overview: '默认文案',
  };
  return newDefaultTodoListItemData;
};

interface FakeDateListDataType {
  id:string;
  date:string;
}
export const fakeDateListData = () => {
  const data:FakeDateListDataType[] = storeManage.get(DATE_LIST_DATA, LOCAL) || [];

  if (data.filter((item) => item.date === todayDateStr).length < 1) {
    data.push({
      id: new Date().getTime() + '',
      date: todayDateStr,
    });
    storeManage.set(DATE_LIST_DATA, data, LOCAL);
  }

  return({
    getter: () => {
      return data;
    },
    adder: (newDataItem:FakeDateListDataType) => {
      data.push(newDataItem);
      storeManage.set(DATE_LIST_DATA, data, LOCAL);
    },
  });
};

export const fakeTodoListData = () => {
  let data:TodoDataInfo[] = storeManage.get(TODO_LIST_DATA, LOCAL) || [];
  return({
    getter: (date:string) => {
      return data.filter((item) => item.date === date);
    },
    setter: (newData:TodoDataInfo) => {
      const handledData = upDateObjectArrayValue({
        sourceObjectArray: data,
        key: 'id',
        newItem: newData,
      });
      data = handledData as TodoDataInfo[];
      storeManage.set(TODO_LIST_DATA, data, LOCAL);
    },
    remover: (id:string) => {
      const handledData = data.filter((item) => item.id !== id);
      data = handledData;
      storeManage.set(TODO_LIST_DATA, data, LOCAL);
    },
    adder: (date:string) => {
      const newTodoListItem = getNewDefaultTodoListItemData(date);
      data.push(newTodoListItem);
      storeManage.set(TODO_LIST_DATA, data, LOCAL);
      return data.filter((item) => item.date === date);
    },
  });
};

export interface UserInfoData {
  userName:string;
  userId:string;
  password:string;
  avatar:string;
  age:number;
  gender:'男'|'女'|'';
}

export interface AddUserInfoData {
  userName:string;
  password:string;
  age:number|undefined;
  gender:'男'|'女'|'';
}

export const fakeUserInfoData = () => {
  const data:UserInfoData[] = storeManage.get(USER_INFO_DATA, SESSION) || [];

  return ({
    getter: (id:string) => {
      const resData = data.filter((item) => item.userId === id);
      if (resData.length <= 0) {
        throw new Error('此用户不存在');
      }
      delete resData[0].password;
      return resData[0];
    },
    adder: (newItem:AddUserInfoData) => {
      const userInfo = data.filter((item) => item.userName === newItem.userName);
      if (userInfo.length > 0) {
        throw new Error('该用户名已存在');
      }
      const userId = new Date().getTime() + '';
      const newDataItem = {
        userName: newItem.userName || '',
        userId,
        password: newItem.password,
        avatar: '',
        age: newItem.age || 0,
        gender: newItem.gender,
      };
      data.push(newDataItem);
      storeManage.set(USER_INFO_DATA, data, SESSION);
      return true;
    },
    checker: (loginData:any) => {
      const { userName, password } = loginData;
      const userInfo = data.filter((item) => item.userName === userName);
      if (userInfo.length <= 0) {
        throw new Error('此用户不存在');
      }
      if (userInfo[0].password === password) {
        const authentication = new Date().getTime() + 'token';
        return { authentication, userId: userInfo[0].userId };
      } else {
        throw new Error('用户名或密码不正确');
      }
    },
  });
};