import { parseISO } from 'date-fns';
import { getFormattedDate } from './getFormattedDate';

// Convert a date (or leave null, 'now', or 'current' for 'today') to UTC time in the format of your choosing (default is 'yyyy/MM/dd HH:mm:ss')
export const getUTCTime = (date, format = 'yyyy/MM/dd HH:mm:ss') => {
  const today =
    !date || date === 'now' || date === 'current'
      ? new Date().toISOString()
      : new Date(date).toISOString();
  const todayParsed = parseISO(today);

  return getFormattedDate(todayParsed, format, 'UTC');
};
