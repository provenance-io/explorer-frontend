import { subDays } from 'date-fns';
import { getUTCTime } from 'utils';

export const getPastDays = (count = 1, format = 'yyyy/MM/dd') => {
  const currentUTCTime = getUTCTime(new Date(), format);
  const pastDays = [currentUTCTime];
  const getPreviousDay = (currentDay) => {
    const prevDay = getUTCTime(subDays(new Date(currentDay), 1), format);
    pastDays.push(prevDay);
  };
  for (let i = 0; i < count; i++) {
    getPreviousDay(pastDays[i]);
  }
  return pastDays;
};
