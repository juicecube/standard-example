import * as React from 'react';
import * as cn from 'classnames';
import './index.scss';

const { useState } = React;

interface MyRadioProps {
  selected:boolean;
  onChange?:() => {};
}

const MyRadio:React.FunctionComponent<MyRadioProps> = (props) => {

  const [selected, setSelected] = useState(props.selected);

  const onRadioClick = () => {
    setSelected(!selected);
    props.onChange && props.onChange();
  }

  return (
    <div styleName={cn('radio', { 'selected': selected })} onClick={onRadioClick}></div>
  );
}

export const MyRadioComp = React.memo(MyRadio);