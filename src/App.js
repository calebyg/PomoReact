import { useEffect, useRef, useState } from "react";
import "./App.css";
import PomoSettings from "./components/PomoSettings";
import PomoTimer from "./components/PomoTimer";
import SettingsButton from "./ui/SettingsButton";
import ProgressButton from "./ui/ProgressButton";
import SettingsContext from "./hooks/SettingsContext";
import PomoProgress from "./components/PomoProgress";

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

  let currentDate = new Date();
  let startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  let week = Math.ceil(days / 7);
  const localStorage = window.localStorage;

  // An empty dependencies array ensures this code
  // runs only once - on initial load
  useEffect(() => {
    if (localStorage.length === 0) {
      setUserData({
        dataYear: new Date().getFullYear(),
        weekData: Array(52).fill(Array(7).fill(0)),
        monthData: Array(12).fill(0),
      });
    } else {
      let savedUserData = JSON.parse(
        localStorage.getItem(new Date().getFullYear() + "-full-data")
      );
      setUserData({
        dataYear: new Date().getFullYear(),
        weekData: savedUserData.weekData,
        monthData: savedUserData.monthData,
      });
    }
  }, []);

  const onUserDataChange = () => {
    const newWeekData = userData.weekData.map((arr) => arr.slice(0));
    const newMonthData = Array.from(userData.monthData);

    newWeekData[week][currentDate.getDay()]++;
    newMonthData[currentDate.getMonth()]++;

    let itemString = currentDate.getFullYear() + "-full-data";

    localStorage.setItem(
      itemString,
      JSON.stringify({ weekData: newWeekData, monthData: newMonthData })
    );

    setUserData({
      dataYear: currentDate.getFullYear(),
      weekData: newWeekData,
      monthData: newMonthData,
    });
  };

  const onClearAllUserData = () => {
    let option = window.confirm("Clear all data?");
    if (option) {
      localStorage.clear();
      setUserData({
        dataYear: new Date().getFullYear(),
        weekData: Array(52).fill(Array(7).fill(0)),
        monthData: Array(12).fill(0),
      });
      window.location.reload(false);
    }
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
            <PomoProgress
              onShowProgressChange={setShowProgress}
              onClearAllUserData={onClearAllUserData}
              chartData={userData}
              currentWeek={week}
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
