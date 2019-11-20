/**
 * 公用方法
 */
interface UpDateObjectArrayValueProps {
  sourceObjectArray:DefaultObejct[];
  key:string;
  newItem:DefaultObejct;
}

// 更新object数组item（有则替换，无则新增）
export const upDateObjectArrayValue = (props:UpDateObjectArrayValueProps) => {
  const { sourceObjectArray, key, newItem } = props;
  const newObjectArray:DefaultObejct[] = [];
  let isNew = true;
  sourceObjectArray.forEach((item, indx) => {
    if (item[key] === newItem[key]) {
      newObjectArray.push(newItem);
      isNew = false;
      return;
    } else {
      newObjectArray.push(item);
    }
  });
  isNew && newObjectArray.push(newItem);
  return newObjectArray;
};