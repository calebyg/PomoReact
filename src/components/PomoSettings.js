import { useRef, useState } from "react";

const PomoSettings = (props) => {
  const checkboxRef = useRef();

  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [longBreakInterval, setLongBreakInterval] = useState(4);

  // Input validation is handled by disabling the submit button
  // if bad input is given
  const [isDisabled, setIsDisabled] = useState(false);

  const pomodoroHandler = (event) => {
    const value = event.target.value;
    setPomodoroTime(value);
    setIsDisabled(value < 1 || value > 100 ? true : false);
  };

  const shortBreakHandler = (event) => {
    const value = event.target.value;
    setShortBreakTime(value);
    setIsDisabled(value < 1 || value > 100 ? true : false);
  };

  const longBreakHandler = (event) => {
    const value = event.target.value;
    setLongBreakTime(value);
    setIsDisabled(value < 1 || value > 100 ? true : false);
  };

  const longBreakIntervalHandler = (event) => {
    const value = event.target.value;
    setLongBreakInterval(value);
    setIsDisabled(value < 1 || value > 100 ? true : false);
  };

  const submitInputHandler = () => {
    // Process targeted values to props for timer
    props.onAutoCycleChange(checkboxRef.current.checked);
    props.onSessionLengthChange(pomodoroTime);
    props.onBreakLengthChange(shortBreakTime);
    props.onLongBreakLengthChange(longBreakTime);
    props.onLongBreakIntervalChange(longBreakInterval);
  };

  return (
    <section className="settings-container">
      <h4>Settings</h4>
      <section className="settings-sub-container">
        <label>Pomodoro</label>
        <label>Short Break</label>
        <label>Long Break</label>
      </section>
      <section className="settings-sub-container">
        <input type="number" defaultValue="25" onChange={pomodoroHandler} />
        <input type="number" defaultValue="5" onChange={shortBreakHandler} />
        <input type="number" defaultValue="15" onChange={longBreakHandler} />
      </section>
      <section className="settings-sub-container">
        <label>Long Break Interval</label>
        <input type="number" defaultValue="4" onChange={longBreakIntervalHandler}/>
      </section>
      <section className="settings-sub-container">
        <label>Auto cycle?</label>
        <input ref={checkboxRef} type="checkbox" />
      </section>
      <button
        className="submit-button"
        disabled={isDisabled}
        onClick={submitInputHandler}
      >
        OK
      </button>
    </section>
  );
};

export default PomoSettings;
