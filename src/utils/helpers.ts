export const randInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createDebounce = () => {
  let timeout: ReturnType<typeof setTimeout>;
  return function (fn: () => void, delayMs: number) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn();
    }, delayMs || 2000);
  };
};
export const getMonthName = (month: number) => {
  const date = new Date();
  date.setMonth(month - 1);
  return date.toLocaleString("en-US", { month: "long" });
};
