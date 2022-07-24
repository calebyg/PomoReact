import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import "./App.css";
import PomoSettings from "./components/PomoSettings";
import PomoTimer from "./components/PomoTimer";
import SessionLogList from "./components/SessionLogList";

const App = () => {
  const [timerMinute, setTimerMinute] = useState(25);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [longBreakLength, setLongBreakLength] = useState(15);
  const [sessionCount, setSessionCount] = useState(1);
  const [longBreakInterval, setLongBreakInterval] = useState(4);
  const [isAutoCycle, setIsAutoCycle] = useState(false);
  const [sessionLogList, setSessionLogList] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const onSessionLengthChange = (newSessionLength) => {
    setSessionLength(newSessionLength);
    setTimerMinute(newSessionLength);
  };

  const onBreakLengthChange = (newBreakLength) => {
    setBreakLength(newBreakLength);
  };

  const onLongBreakLengthChange = (newLongBreakLength) => {
    setLongBreakLength(newLongBreakLength);
  };

  const onLongBreakIntervalChange = (newLongBreakInterval) => {
    setLongBreakInterval(newLongBreakInterval);
  };

  const onTimerMinuteChange = (minuteChange) => {
    setTimerMinute(minuteChange);
  };

  const onSessionCountUpdate = () => {
    setSessionCount((sessionCount) => sessionCount + 1);
  };

  const onSessionLogChange = (taskName) => {
    setSessionLogList((sessionLogList) => [
      ...sessionLogList,
      { id: nanoid(), taskName: taskName, timerMinute: sessionLength },
    ]);
  };

  const onResetTimer = () => {
    setSessionLength(sessionLength);
    setTimerMinute(sessionLength);
    setBreakLength(breakLength);
    setLongBreakLength(longBreakLength);
  };

  const onAutoCycleChange = (newAutoCycle) => {
    setIsAutoCycle(newAutoCycle);
  };

  const onRunningChange = (newRunning) => {
    setIsRunning(newRunning);
  }

  return (
    <main className="main-container">
      <h2>Pomodoro Clock</h2>
      <PomoSettings
        onSessionLengthChange={onSessionLengthChange}
        onBreakLengthChange={onBreakLengthChange}
        onLongBreakLengthChange={onLongBreakLengthChange}
        onAutoCycleChange={onAutoCycleChange}
        onLongBreakIntervalChange={onLongBreakIntervalChange}
        isRunning={isRunning}
      />
      <PomoTimer
        sessionInterval={sessionLength}
        breakInterval={
          sessionCount > 1 && sessionCount % longBreakInterval === 0
            ? longBreakLength
            : breakLength
        }
        timerMinute={timerMinute}
        onTimerMinuteChange={onTimerMinuteChange}
        resetTimer={onResetTimer}
        isAutoCycle={isAutoCycle}
        onSessionLogChange={onSessionLogChange}
        sessionCount={sessionCount}
        onSessionCountUpdate={onSessionCountUpdate}
        onRunningChange={onRunningChange}
      />
      <SessionLogList data={sessionLogList} />
    </main>
  );
};

export default App;
