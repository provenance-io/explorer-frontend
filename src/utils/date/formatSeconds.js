// When a have a value that is in seconds, convert it to any days, hours, mins, seconds
// Eg: instead of showing 1,135.23 seconds, show 19Minutes 40.8Seconds or 19:40.8
export const formatSeconds = (seconds = 0, digits = 2) => {
  const secDay = 86400;
  const secHour = 3600;
  const secMin = 60;

  const getFinalValue = (value) => value.toLocaleString('en-US', { maximumFractionDigits: digits });

  // Check for days
  if (seconds >= secDay) {
    const finalValue = getFinalValue(seconds / secDay);
    return `${finalValue} Day${finalValue > 1 ? 's' : ''}`;
  }
  // Check for hours
  if (seconds >= secHour) {
    const finalValue = getFinalValue(seconds / secHour);
    return `${finalValue} Hour${finalValue > 1 ? 's' : ''}`;
  }
  // Check for mins
  if (seconds >= secMin) {
    const finalValue = getFinalValue(seconds / secMin);
    return `${finalValue} Minute${finalValue > 1 ? 's' : ''}`;
  }
  // Return seconds
  return `${getFinalValue(seconds)} Second${seconds > 1 ? 's' : ''}`;
};
