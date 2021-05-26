import { formatDistanceStrict, parse } from 'date-fns';
import { getUTCTime } from './getUTCTime';

// Get the difference between two dates
// Options include:
// Unit (string): Force time difference to show in one unit only, ex: 'seconds'
// Prefix/Suffix (string): String to show before/after the time difference
// Longhand (boolean): display 'second' instead of 's'
export const getTimeSince = (prevDate, options = {}) => {
  // Look at any options the user wants
  const unit = options.unit;
  const prefix = options.prefix || '> ';
  const suffix = options.suffix || '';
  const longhand = options.longhand;

  const currentUTCDate = getUTCTime('current');
  // DateFNS requires a parsed date to do any work on it (can't just take in a string)
  const currentUTCDateParsed = parse(currentUTCDate, 'yyyy/MM/dd HH:mm:ss', new Date(currentUTCDate));
  const prevDateParsed = parse(prevDate, 'yyyy/MM/dd HH:mm:ss', new Date(prevDate));
  // Built in date-fns time difference function
  const timeSince = formatDistanceStrict(currentUTCDateParsed, prevDateParsed, { roundingMethod: 'floor', unit });
  // Clean up words if longhand isn't requested
  if (!longhand) {
    let formattedTimeSince = timeSince.replace('seconds', 'second');
    formattedTimeSince = formattedTimeSince.replace('second', 's');
    formattedTimeSince = formattedTimeSince.replace('minutes', 'minute');
    formattedTimeSince = formattedTimeSince.replace('minute', 'm');
    formattedTimeSince = formattedTimeSince.replace('hours', 'hour');
    formattedTimeSince = formattedTimeSince.replace('hour', 'h');
    formattedTimeSince = formattedTimeSince.replace('years', 'year');
    formattedTimeSince = formattedTimeSince.replace('year', 'y');
    formattedTimeSince = formattedTimeSince.replace(' ', '');

    return `${prefix}${formattedTimeSince}${suffix}`;
  }

  return `${prefix}${timeSince}${suffix}`;
};
