import { useRef, useState } from "react";
import "./App.css";
import PomoSettings from "./components/PomoSettings";
import PomoTimer from "./components/PomoTimer";

const App = () => {
  const [timerMinute, setTimerMinute] = useState(25);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [longBreakLength, setLongBreakLength] = useState(15);
  const [isAutoCycle, setIsAutoCycle] = useState(false);

  const onSessionIntervalChange = (newSessionLength) => {
    setSessionLength(newSessionLength);
    setTimerMinute(newSessionLength);
  };

  const onBreakIntervalChange = (newBreakLength) => {
    setBreakLength(newBreakLength);
  };

  const onLongBreakIntervalChange = (newLongBreakLength) => {
    setLongBreakLength(newLongBreakLength);
  };

  const onTimerMinuteChange = (minuteChange) => {
    setTimerMinute(minuteChange);
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

  return (
    <main className="main-container">
      <h2>Pomodoro Clock</h2>
      <PomoSettings
        onSessionIntervalChange={onSessionIntervalChange}
        onBreakIntervalChange={onBreakIntervalChange}
        onLongBreakIntervalChange={onLongBreakIntervalChange}
        onAutoCycleChange={onAutoCycleChange}
      />
      <section className="interval-length-container">
      </section>
      <PomoTimer
        sessionInterval={sessionLength}
        breakInterval={breakLength}
        timerMinute={timerMinute}
        onTimerMinuteChange={onTimerMinuteChange}
        resetTimer={onResetTimer}
        isAutoCycle={isAutoCycle}
      />
    </main>
  );
};

export default App;
