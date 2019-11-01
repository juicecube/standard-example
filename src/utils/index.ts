/**
 * 公用方法
 */
type upDateObjectValueProps = {
  sourceObjectArray:DefaultObejct[];
  key:string;
  newItem:DefaultObejct;
}
export const upDateObjectValue = (props:upDateObjectValueProps) => {
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
}