import { useEffect, useRef, useState } from "react";

const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(null);
  const savedSecondsRef = useRef(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now() - savedSecondsRef.current * 1000;
      }

      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setSeconds(elapsed);
      }, 250);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    savedSecondsRef.current = seconds;
    setIsRunning(false);
  };

  const resetTimer = () => {
    savedSecondsRef.current = 0;
    startTimeRef.current = null;
    setSeconds(0);
  };

  return {
    seconds,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  };
};

export default useTimer;