export const getCookie = (cookieName, skipClean = false) => {
  // cookie method exists
  const allowed = window && window.document && window.document.cookie !== undefined;
  if (!allowed) return null;
  const cookieValues = window.document.cookie;
  const exists = cookieValues.includes(cookieName);
  if (!exists) return null;
  const foundValue = cookieValues.split(`${cookieName}=`)[1].split(';')[0];
  const cleanFoundValue = foundValue.replace(/[^\w\s]/gi, '');
  return skipClean ? foundValue : cleanFoundValue;
};
