import { useRef, useEffect, useState } from "react";

const PomoSettings = (props) => {
  const defaultPomodoroTime = 25;
  const defaultShortBreakTime = 5;
  const defaultLongBreakTime = 15;
  const defaultLongBreakInterval = 4;

  const checkboxRef = useRef();
  const clickRef = useRef();
  const pomoRef = useRef();
  const shortBreakRef = useRef();
  const longBreakRef = useRef();
  const longBreakIntervalRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
  }, []);

  const handleClick = (e) => {
    if (!clickRef.current.contains(e.target)) {
      props.onAutoCycleChange(checkboxRef.current.checked);
      props.onSessionLengthChange(pomoRef.current.value);
      props.onBreakLengthChange(shortBreakRef.current.value);
      props.onLongBreakLengthChange(longBreakRef.current.value);
      props.onLongBreakIntervalChange(longBreakIntervalRef.current.value);
    }
  };

  const pomodoroHandler = (event) => {
    const value = event.target.value;
    console.log(value);
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

  return (
    <section
      className={
        props.isRunning ? "settings-container-disabled" : "settings-container"
      }
      ref={clickRef}
    >
      <h4>Settings</h4>
      <section className="settings-sub-container">
        <label>Pomodoro</label>
        <label>Short Break</label>
        <label>Long Break</label>
      </section>
      <section className="settings-sub-container">
        <input
          type="number"
          defaultValue="25"
          ref={pomoRef}
          onChange={pomodoroHandler}
        />
        <input
          type="number"
          defaultValue="5"
          ref={shortBreakRef}
          onChange={shortBreakHandler}
        />
        <input
          type="number"
          defaultValue="15"
          ref={longBreakRef}
          onChange={longBreakHandler}
        />
      </section>
      <section className="settings-sub-container">
        <label>Long Break Interval</label>
        <input
          type="number"
          defaultValue="4"
          ref={longBreakIntervalRef}
          onChange={longBreakIntervalHandler}
        />
      </section>
      <section className="settings-sub-container">
        <label>Auto cycle?</label>
        <input ref={checkboxRef} type="checkbox" />
      </section>
    </section>
  );
};

export default PomoSettings;
