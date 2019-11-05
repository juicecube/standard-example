import * as React from 'react';
import { DateListType } from 'example/redux/index/index';
import { DateListItemComp } from '../date-list-item';
import './index.scss';


interface DateListProps {
  dateList:DateListType[];
  onSelect:(id:string) => void;
}

const DateList:React.FunctionComponent<DateListProps> = (props) => {

  const { dateList = [], onSelect } = props;

  return(
    <div styleName="container">
      {
        dateList.map((item, ind) => {
          return <DateListItemComp key={item.id} date={item.date} isToday={item.isToday} id={item.id} onClick={(id) => onSelect(id)}/>
        })
      }
    </div>
  );
}

export const DateListComp = React.memo(DateList);