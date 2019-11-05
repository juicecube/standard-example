import * as React from 'react';
import * as cn from 'classnames';
import './index.scss';


interface DateListItemProps {
  id:string;
  date:string;
  isToday:boolean;
  onClick: (date:string) => void;
  isSelected:boolean;
}

const DateListItem:React.FunctionComponent<DateListItemProps> = (props) => {

  const { date, isToday, onClick, isSelected } = props;
  return(
    <div styleName={cn('container', { 'selected': isSelected })} onClick={() => onClick(date)}>
      {
        isToday && <span styleName="mark">Today</span>
      }
      <span styleName="date">{ date }</span>
    </div>
  );
}

export const DateListItemComp = React.memo(DateListItem);