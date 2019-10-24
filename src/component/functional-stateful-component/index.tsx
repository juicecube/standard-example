/**
 * Functional Stateful Component Template
 */
import React, { useState, useMemo } from 'react';
 
// 类型定义
type FsfcProps = {
  inputValue:string;
  onChange:() => void;
  title?:string;
};

const Fsfc:React.FunctionComponent<FsfcProps> = (props) => {
  const { inputValue, onChange, title } = props;

  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      <p>{title}</p>
      {
        isShow && <span>{inputValue}</span>
      }
      <input type="text" onChange={onChange}/>
      <div>
          <button onClick={() => { setIsShow(!isShow) }}/>
      </div>
    </div>
  );
};

// 建议，非必须属性写默认值
Fsfc.defaultProps = {
  title: '默认标题',
}
