import addDays from 'date-fns/addDays';

export const setCookie = (
  cookieName: string, 
  cookieValue: string, 
  days?: number) => {
  // cookie method exists
  const expires = days ? `; expires=${addDays(new Date(), days)}` : '';
  const allowed = window && window.document && window.document.cookie !== undefined;
  if (!allowed) return;
  window.document.cookie = `${cookieName}=${cookieValue}${expires}; path=/`;
};
