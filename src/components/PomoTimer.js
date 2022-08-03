import { useEffect, useContext, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import useInterval from "../hooks/useInterval";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import SettingsContext from "./SettingsContext";

const red = "#f54e4e";
const green = "#4aec8c";

const PomoTimer = (props) => {
  const settingsInfo = useContext(SettingsContext);

  const [minutes, setMinutes] = useState(settingsInfo.workMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work"); // modes: 'work', 'short-break', 'long-break'
  const [sessionCount, setSessionCount] = useState(1);
  // const [taskName, setTaskName] = useState("");

  useInterval(
    () => {
      decreaseTimer();
    },
    isRunning ? 1000 : null
  );

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : mode === "short-break"
      ? settingsInfo.shortBreakMinutes * 60
      : settingsInfo.longBreakMinutes * 60;

  const percentage = Math.round(
    ((minutes * 60 + seconds) / totalSeconds) * 100
  );

  const decreaseTimer = () => {
    switch (seconds) {
      case 0:
        if (minutes === 0) {
          // Session completed
          if (mode === "work") {
            if (sessionCount % settingsInfo.longBreakInterval === 0) {
              setMode("long-break");
              setMinutes(settingsInfo.longBreakMinutes);
            } else {
              setMode("short-break");
              setMinutes(settingsInfo.shortBreakMinutes);
            }
            // props.onSessionLogChange(taskName);
          }
          // Break completed
          else {
            setMode("work");
            setMinutes(settingsInfo.workMinutes);

            setSessionCount((sessionCount) => sessionCount + 1);
          }

          if (settingsInfo.isAutoCycle === false) setIsRunning(false);
        } else {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        }
        break;
      default:
        setSeconds((seconds) => seconds - 1);
        break;
    }
  };

  return (
    <section className="timer-container">
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${
          seconds === 0 ? "00" : seconds < 10 ? "0" + seconds : seconds
        }`}
        styles={buildStyles({
          textColor: "#000000",
          pathColor: mode === "work" ? red : green,
          trailColor: "rgba(255, 255, 255, 2)",
        })}
      />
      <h4>
        {mode === "work"
          ? "Time to focus!"
          : mode === "short-break"
          ? "Time for a short break!"
          : "Time for a long break!"}
      </h4>
      <h4>#{props.sessionCount}</h4>
      <div>
        {isRunning ? (
          <PauseButton onClick={() => setIsRunning(false)} />
        ) : (
          <PlayButton onClick={() => setIsRunning(true)} />
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </section>
  );
};

export default PomoTimer;
