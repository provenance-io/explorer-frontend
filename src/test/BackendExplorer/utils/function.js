export const repeatFunction = (func, times = 1) => {
  if (times) {
    const repeatsRemaining = times - 1 > 0 ? times - 1 : 0;
    func();
    repeatsRemaining && repeatFunction(func, repeatsRemaining);
  }
};
