import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import "./App.css";
import PomoSettings from "./components/PomoSettings";
import PomoTimer from "./components/PomoTimer";
import SessionLogList from "./components/SessionLogList";
import SettingsContext from "./hooks/SettingsContext";

const App = () => {
  const [timerMinute, setTimerMinute] = useState(25);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [longBreakLength, setLongBreakLength] = useState(15);
  const [sessionCount, setSessionCount] = useState(1);

  const [isAutoCycle, setIsAutoCycle] = useState(false);
  const [sessionLogList, setSessionLogList] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(10);
  const [longBreakMinutes, setLongBreakMinutes] = useState(30);
  const [longBreakInterval, setLongBreakInterval] = useState(4);
  const [showSettings, setShowSettings] = useState(false);

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
  };

  return (
    <main className="main-container">
      <SettingsContext.Provider
        value={{
          showSettings,
          setShowSettings,
          workMinutes,
          shortBreakMinutes,
          setWorkMinutes,
          setShortBreakMinutes,
          longBreakMinutes,
          setLongBreakMinutes,
          longBreakInterval,
          setLongBreakInterval,
          isAutoCycle,
          setIsAutoCycle,
        }}
      >
        <h2>Pomodoro Clock</h2>
        {showSettings ? (
          <PomoSettings
            onSessionLengthChange={onSessionLengthChange}
            onBreakLengthChange={onBreakLengthChange}
            onLongBreakLengthChange={onLongBreakLengthChange}
            onAutoCycleChange={onAutoCycleChange}
            onLongBreakIntervalChange={onLongBreakIntervalChange}
            isRunning={isRunning}
          />
        ) : (
          <section>
            <PomoTimer
              sessionInterval={sessionLength}
              breakInterval={
                sessionCount > 1 && sessionCount % longBreakInterval === 0
                  ? longBreakLength
                  : breakLength
              }
              timerMinute={workMinutes}
              onTimerMinuteChange={onTimerMinuteChange}
              resetTimer={onResetTimer}
              isAutoCycle={isAutoCycle}
              onSessionLogChange={onSessionLogChange}
              sessionCount={sessionCount}
              onSessionCountUpdate={onSessionCountUpdate}
              onRunningChange={onRunningChange}
            />
            <SessionLogList data={sessionLogList} />
          </section>
        )}
      </SettingsContext.Provider>
    </main>
  );
};

export default App;
