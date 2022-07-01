import { useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest function
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};

export default useInterval;
