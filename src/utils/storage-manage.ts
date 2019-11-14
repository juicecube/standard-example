
export const USER_TOKEN = 'authentication';
export const USER_ID = 'userId';
export class StorageManage {

  get(name:string) {
    const nameValue = localStorage.getItem(name);
    return nameValue ? JSON.parse(nameValue) : {} ;
  }

  set(name:string, value:any) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  remove(name:string) {
    localStorage.removeItem(name);
  }

  clear() {
    localStorage.clear();
  }
}

export const storeManage = new StorageManage();