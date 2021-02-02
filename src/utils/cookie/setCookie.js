export const setCookie = (cookieName, cookieValue) => {
  // cookie method exists
  const allowed = window && window.document && window.document.cookie !== undefined;
  if (!allowed) return;
  window.document.cookie = `${cookieName}=${cookieValue};path=/explorer`;
};
