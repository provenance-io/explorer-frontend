// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty
export const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;
