// Capitalize the passed in string/word
// Eg: "hello world" => "Hello World"
// Eg: "hEllO" => "HEllO"
export const capitalize = (str) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
