import { superDate } from '@mlz/super-utils';
import { FetchDateListRes } from 'example/api/fake-api';
import { DateListType } from './index';

export const handleDateListRes = (resData:FetchDateListRes[]):DateListType[] => {
  const todayDate = superDate.format(new Date().getTime(), 'yyyy-mm-dd');
  return resData.map((item, index) => ({
    id: item.id,
    date: item.date,
    isToday: item.date === todayDate,
  }));
};
