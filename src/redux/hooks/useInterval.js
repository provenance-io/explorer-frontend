import { useEffect, useRef } from 'react';

// Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export const useInterval = (callback, delay, disabled) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      if (disabled) {
        return () => {};
      }
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return null;
  }, [delay, disabled]);
};
