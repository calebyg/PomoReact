import { useEffect, useRef, useState } from "react";
import useInterval from "../hooks/useInterval";

const PomoTimer = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [taskName, setTaskName] = useState("");

  useInterval(
    () => {
      decreaseTimer();
    },
    isRunning ? 1000 : null
  );

  const startTimer = () => {
    setIsRunning(true);
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
            props.onSessionLogChange(taskName);
            if (props.isAutoCycle !== true) {
              setIsRunning(false);
            }
          } else {
            // Break completed
            props.onSessionCountUpdate();
            setIsSession(true);
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

  const taskNameHandler = (event) => {
    setTaskName(event.target.value);
  };

  return (
    <section>
      <h4>{isSession ? "Time to focus!" : "Time for a break!"}</h4>
      <h4>Current session: #{props.sessionCount}</h4>
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
      <section disabled={true}>
        <label>Task name:</label>
        <input type="text" onChange={taskNameHandler} disabled={isRunning} />
      </section>
    </section>
  );
};

export default PomoTimer;
