import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import "./App.css";
import PomoSettings from "./components/PomoSettings";
import PomoTimer from "./components/PomoTimer";
import SessionLogList from "./components/SessionLogList";
import SettingsContext from "./hooks/SettingsContext";

const App = () => {
  const [isAutoBreak, setIsAutoBreak] = useState(false);
  const [isAutoPomodoro, setIsAutoPomodoro] = useState(false);
  const [sessionLogList, setSessionLogList] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(10);
  const [longBreakMinutes, setLongBreakMinutes] = useState(30);
  const [longBreakInterval, setLongBreakInterval] = useState(4);
  const [showSettings, setShowSettings] = useState(false);

  // const onSessionLogChange = (taskName) => {
  //   setSessionLogList((sessionLogList) => [
  //     ...sessionLogList,
  //     { id: nanoid(), taskName: taskName, timerMinute: sessionLength },
  //   ]);
  // };

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
          isAutoBreak,
          setIsAutoBreak,
          isAutoPomodoro,
          setIsAutoPomodoro,
        }}
      >
        <h2>Pomodoro Clock</h2>
        {showSettings ? (
          <PomoSettings />
        ) : (
          <section>
            <PomoTimer />
            <SessionLogList data={sessionLogList} />
          </section>
        )}
      </SettingsContext.Provider>
    </main>
  );
};

export default App;
