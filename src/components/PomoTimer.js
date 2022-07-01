import { useEffect, useRef, useState } from "react";
import useInterval from "../hooks/useInterval";

const PomoTimer = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [sessionCount, setSessionCount] = useState(0);

  useInterval(
    () => {
      decreaseTimer();
    },
    isRunning ? 1000 : null
  );

  const startTimer = () => {
    setIsRunning(true);
    if (isSession) {
      setSessionCount((sessionCount) => sessionCount + 1);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const decreaseTimer = () => {
    switch (seconds) {
      case 0:
        if (props.timerMinute === 0) {
          // Session completed
          if (isSession) {
            setIsSession(false);
            props.onTimerMinuteChange(props.breakInterval);
            if (props.isAutoCycle !== true) {
              setIsRunning(false);
            }
          } else {
            // Break completed
            setIsSession(true);
            setSessionCount((sessionCount) => sessionCount + 1);
            props.onTimerMinuteChange(props.sessionInterval);
            if (props.isAutoCycle !== true) {
              setIsRunning(false);
            }
          }
        } else {
          props.onTimerMinuteChange(props.timerMinute - 1);
          setSeconds(59);
        }
        break;
      default:
        setSeconds((seconds) => seconds - 1);
        break;
    }
  };

  const resetTimer = () => {
    setIsRunning(false);

    props.resetTimer();

    setIsSession(true);
    setSeconds(0);
  };

  return (
    <section>
      <h4>{isSession ? "Time to focus!" : "Time for a break!"}</h4>
      <section className="timer-container">
        <span>{props.timerMinute}</span>
        <span>:</span>
        <span>
          {seconds === 0 ? "00" : seconds < 10 ? "0" + seconds : seconds}
        </span>
      </section>
      <section className="section-container">
        <button onClick={startTimer}>Play</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Refresh</button>
      </section>
      <section>
        <h4>Session #{sessionCount}</h4>
      </section>
    </section>
  );
};

export default PomoTimer;
