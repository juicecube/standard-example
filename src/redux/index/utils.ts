import { superDate } from 'super-great-utils';
import { FetchDateListRes } from 'example/api/fake-api';
import { DateListType } from './index';

export const handleDateListRes = (resData:FetchDateListRes[]):DateListType[] => {
  const todayDate = superDate.format(new Date().getTime(), 'yyyy-mm-dd');
  return resData.map((item, index) => {
    return {
      id: item.id,
      date: item.date,
      isToday: item.date === todayDate,
    };
  });
}