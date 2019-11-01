import * as React from 'react';
import * as cn from 'classnames';
import './index.scss';

const { useState } = React;

interface MyRadioProps {
  selected:boolean;
  onChange?:(selected:boolean) => void;
}

const MyRadio:React.FunctionComponent<MyRadioProps> = (props) => {

  const [selected, setSelected] = useState(props.selected);

  const onRadioClick = (e:any) => {
    e.stopPropagation();
    setSelected(!selected);
    props.onChange && props.onChange(!selected);
  }

  return (
    <div styleName={cn('radio', { 'selected': selected })} onClick={onRadioClick}></div>
  );
}

export const MyRadioComp = React.memo(MyRadio);