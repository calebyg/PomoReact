import { useRef, useEffect, useState, useContext } from "react";
import BackButton from "../ui/BackButton";
import SettingsContext from "../hooks/SettingsContext";

/**
 * PomoSettings is a UI component that allows users to
 * specify the timers for their session(s).
 * @param {*} props
 * @returns
 */
const PomoSettings = (props) => {
  const defaultPomodoroTime = 25;
  const defaultShortBreakTime = 5;
  const defaultLongBreakTime = 15;
  const defaultLongBreakInterval = 4;

  const autoBreakRef = useRef();
  const autoPomodoroRef = useRef();
  const pomoRef = useRef();
  const shortBreakRef = useRef();
  const longBreakRef = useRef();
  const longBreakIntervalRef = useRef();

  const settingsInfo = useContext(SettingsContext);

  const pomodoroHandler = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 100) {
      pomoRef.current.value = defaultPomodoroTime;
    }
  };

  const shortBreakHandler = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 100) {
      shortBreakRef.current.value = defaultShortBreakTime;
    }
  };

  const longBreakHandler = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 100) {
      longBreakRef.current.value = defaultLongBreakTime;
    }
  };

  const longBreakIntervalHandler = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 100) {
      longBreakIntervalRef.current.value = defaultLongBreakInterval;
    }
  };

  const backButtonHandler = () => {
    settingsInfo.setWorkMinutes(pomoRef.current.value);
    settingsInfo.setShortBreakMinutes(shortBreakRef.current.value);
    settingsInfo.setLongBreakMinutes(longBreakRef.current.value);
    settingsInfo.setLongBreakInterval(longBreakIntervalRef.current.value);
    settingsInfo.setIsAutoBreak(autoBreakRef.current.checked);
    settingsInfo.setIsAutoPomodoro(autoPomodoroRef.current.checked);
    props.onShowSettingsChange(false);
  };

  return (
    <section className="settings-container">
      <h2>Timer Setting</h2>
      <h4>Time(minutes)</h4>
      <section className="settings-sub-container">
        <label>Pomodoro</label>
        <label>Short Break</label>
        <label>Long Break</label>
      </section>

      <section className="settings-sub-container">
        <input
          type="number"
          defaultValue={settingsInfo.workMinutes}
          ref={pomoRef}
          onChange={pomodoroHandler}
        />
        <input
          type="number"
          defaultValue={settingsInfo.shortBreakMinutes}
          ref={shortBreakRef}
          onChange={shortBreakHandler}
        />
        <input
          type="number"
          defaultValue={settingsInfo.longBreakMinutes}
          ref={longBreakRef}
          onChange={longBreakHandler}
        />
      </section>
      <section className="settings-sub-container">
        <label>Auto start breaks?</label>
        <input ref={autoBreakRef} type="checkbox" />
      </section>
      <section className="settings-sub-container">
        <label>Auto start pomodoros?</label>
        <input ref={autoPomodoroRef} type="checkbox" />
      </section>
      <section className="settings-sub-container">
        <label>Long Break Interval</label>
        <input
          type="number"
          defaultValue={settingsInfo.longBreakInterval}
          ref={longBreakIntervalRef}
          onChange={longBreakIntervalHandler}
        />
      </section>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <BackButton onClick={backButtonHandler} />
      </div>
    </section>
  );
};

export default PomoSettings;
