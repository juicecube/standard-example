import * as React from 'react';
import * as cn from 'classnames';
import './index.scss';

const { useState } = React;

interface RadioButtonProps {
  selected:boolean;
  onChange?:(selected:boolean) => void;
}

const RadioButton:React.FunctionComponent<RadioButtonProps> = (props) => {

  const [selected, setSelected] = useState(props.selected);

  const onRadioClick = (e:any) => {
    e.stopPropagation();
    setSelected(!selected);
    props.onChange && props.onChange(!selected);
  };

  return (
    <div styleName={cn('radio', { 'selected': selected })} onClick={onRadioClick}></div>
  );
};

export const RadioButtonComp = React.memo(RadioButton);