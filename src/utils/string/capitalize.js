// Capitalize the passed in string/word
// Eg: "hello world" => "Hello World"
// Eg: "hEllO" => "Hello"
export const capitalize = (str) =>
  str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
