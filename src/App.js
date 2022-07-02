import { useRef, useState } from "react";
import "./App.css";
import PomoBreak from "./components/PomoBreak";
import PomoSession from "./components/PomoSession";
import PomoTimer from "./components/PomoTimer";

const App = () => {
  const [timerMinute, setTimerMinute] = useState(25);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isAutoCycle, setIsAutoCycle] = useState(false);

  const onBreakIntervalChange = (newBreakLength) => {
    setBreakLength(newBreakLength);
  };

  const onSessionIntervalChange = (newSessionLength) => {
    setSessionLength(newSessionLength);
    setTimerMinute(newSessionLength);
  };  

  const onTimerMinuteChange = (minuteChange) => {
    setTimerMinute(minuteChange);
  };

  const onResetTimer = () => {
    setSessionLength(25);
    setTimerMinute(25);
    setBreakLength(5);
  };

  const onCycleChange = (event) => {
    if (event.target.checked === true) setIsAutoCycle(true);
    else setIsAutoCycle(false);
  };

  return (
    <main className="main-container">
      <h2>Pomodoro Clock</h2>
      {/* <PomoSettings /> */}
      <label>Auto cycle?</label>
      <input type="checkbox" onClick={onCycleChange} />
      <section className="interval-length-container">
        <PomoSession
          onSessionIntervalChange={onSessionIntervalChange}
          sessionInterval={sessionLength}
        />
        <PomoBreak
          onBreakIntervalChange={onBreakIntervalChange}
          breakInterval={breakLength}
        />
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
