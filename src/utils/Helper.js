export const debounce = (fn, delay) => {
    let timerId = null;
    return function (...args) {
      const context = this;
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  };
  
  export const getRandomNumberInDice = () => {
    return Math.floor(Math.random() * (6 - 1) + 1);
  };
  