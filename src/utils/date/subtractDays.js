// Take in date obj and return previous day(s) date obj
export const subtractDays = (today, amount) => {
  const yesterday = new Date(today.getTime());
  yesterday.setDate(yesterday.getDate() - amount);
  return yesterday;
};
