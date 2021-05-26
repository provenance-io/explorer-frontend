import { utcToZonedTime, format as dateFnsFormat } from 'date-fns-tz';

// Get a date (in the format of your choosing, default is 'yyyy/MM/dd HH:mm:ss') for any timezone
export const getFormattedDate = (date, timeFormat = 'yyyy/MM/dd HH:mm:ss', timeZone = 'UTC') =>
  dateFnsFormat(utcToZonedTime(date, timeZone), timeFormat, { timeZone });
