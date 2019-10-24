/**
 * Functional Stateless Component Template
 */
import * as React from 'react';

// 类型定义
type FslcProps = {
  inputValue:string;
  onChange:() => void;
  title?:string;
};

const Fslc:React.FunctionComponent<FslcProps> = (props) => {
  const { inputValue, onChange, title } = props;
  return (
    <div>
      <p>{title}</p>
      <span>{inputValue}</span>
      <input type="text" onChange={onChange}/>
    </div>
  );
};

// 建议，非必须属性写默认值
Fslc.defaultProps = {
  title: '默认标题',
}