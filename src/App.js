import { useEffect, useRef, useState } from "react";
import "./App.css";
import PomoSettings from "./components/PomoSettings";
import PomoTimer from "./components/PomoTimer";
import SettingsButton from "./ui/SettingsButton";
import ProgressButton from "./ui/ProgressButton";
import SettingsContext from "./hooks/SettingsContext";
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
  const [userData, setUserData] = useState({});

  const localStorage = window.localStorage;

  // An empty dependencies array ensures this code
  // runs only once - on initial load
  useEffect(() => {
    if (localStorage.length === 0) {
      setUserData({
        dayData: Array(7).fill(0),
        monthData: Array(12).fill(0),
      });
    } else {
      let savedUserData = JSON.parse(localStorage.getItem("2022-full-data"));
      setUserData({
        dayData: savedUserData.dayData,
        monthData: savedUserData.monthData,
      });
    }
  }, []);

  const onUserDataChange = (month, day) => {
    const newDayData = Array.from(userData.dayData);
    const newMonthData = Array.from(userData.monthData);

    newDayData[day]++;
    newMonthData[month]++;

    localStorage.setItem(
      "2022-full-data",
      JSON.stringify({ dayData: newDayData, monthData: newMonthData })
    );

    setUserData({
      dayData: newDayData,
      monthData: newMonthData,
    });
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
        <h1>
          {showSettings ? `Settings` : showProgress ? `Progress` : `PomoReact`}
        </h1>
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
          <section className="parent-timer-container">
            <PomoTimer onUserDataChange={onUserDataChange} />
            <div className="button-bar-container">
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
