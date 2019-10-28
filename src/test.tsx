import * as React from 'react';

export  const test = (name:string) => {
  console.log(name + '   ssss');
};

export const test2 = () => {
  console.log('444');
}

export const UiComponent = () => {
  const content = '这是一个UI组件'
  return (
    <div>
      {
        content
      }
    </div>
  );
}