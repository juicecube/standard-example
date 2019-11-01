import * as React from 'react';
import './index.scss';


interface DateListItemProps {
  id:string;
  date:string;
  isToday:boolean;
  onClick: (id:string) => void;
}

const DateListItem:React.FunctionComponent<DateListItemProps> = (props) => {

  const { id, date, isToday, onClick } = props;
  return(
    <div styleName="container" onClick={() => onClick(date)}>
      {
        isToday && <span styleName="mark">Today</span>
      }
      <span styleName="date">{ date }</span>
    </div>
  );
}

export const DateListItemComp = React.memo(DateListItem);