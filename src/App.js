import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import "./App.css";
import PomoSettings from "./components/PomoSettings";
import PomoTimer from "./components/PomoTimer";
import SettingsButton from "./ui/SettingsButton";
import ProgressButton from "./ui/ProgressButton";
import SettingsContext from "./hooks/SettingsContext";
import BarChart from "./components/LineChart";
import PomoProgress from "./components/PomoProgress";
import LineChart from "./components/LineChart";

const App = () => {
  const [isAutoBreak, setIsAutoBreak] = useState(false);
  const [isAutoPomodoro, setIsAutoPomodoro] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(10);
  const [longBreakMinutes, setLongBreakMinutes] = useState(30);
  const [longBreakInterval, setLongBreakInterval] = useState(4);
  const [userData, setUserData] = useState([]);

  const onUserDataChange = (time, date) => {
    setUserData((userData) => [
      ...userData,
      { sessionTime: time, sessionDate: date },
    ]);
  };

  return (
    <main className="main-container">
      <SettingsContext.Provider
        value={{
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
          <PomoSettings onShowSettingsChange={setShowSettings} />
        ) : showProgress ? (
          <div>
            <LineChart
              onShowProgressChange={setShowProgress}
              chartData={userData}
            />
          </div>
        ) : (
          <section>
            <PomoTimer onUserDataChange={onUserDataChange} />
            <div style={{ marginTop: "20px" }}>
              <SettingsButton onClick={() => setShowSettings(true)} />
              <ProgressButton onClick={() => setShowProgress(true)} />
            </div>
          </section>
        )}
      </SettingsContext.Provider>
    </main>
  );
};

export default App;
