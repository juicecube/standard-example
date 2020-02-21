
export const USER_TOKEN = 'authentication';
export const USER_ID = 'userId';
export const TODO_LIST_DATA = 'todoListData';
export const DATE_LIST_DATA = 'dateListData';
export const USER_INFO_DATA = 'userInfoData';
export const LOCAL = 'local';
export const SESSION = 'session';

type ManageKey = 'local' | 'session';

export class StorageManage {

  get(name:string, key:ManageKey) {
    if (key === LOCAL) {
      const nameValueL = localStorage.getItem(name);
      return nameValueL ? JSON.parse(nameValueL) : null ;
    }
    const nameValueS = sessionStorage.getItem(name);
    return nameValueS ? JSON.parse(nameValueS) : null ;
  }

  set(name:string, value:any, key:ManageKey) {
    if (key === LOCAL) {
      localStorage.setItem(name, JSON.stringify(value));
    } else {
      sessionStorage.setItem(name, JSON.stringify(value));
    }
  }

  remove(name:string, key:ManageKey) {
    if (key === LOCAL) {
      localStorage.removeItem(name);
    } else {
      sessionStorage.removeItem(name);
    }
  }

  clear(key:ManageKey) {
    if (key === LOCAL) {
      localStorage.clear();
    } else {
      sessionStorage.clear();
    }
  }
}

export const storeManage = new StorageManage();
