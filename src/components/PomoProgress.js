import React, { useContext, useEffect, useRef, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import BackButton from "../ui/BackButton";
import SettingsContext from "../hooks/SettingsContext";
import ClearDataButton from "../ui/ClearDataButton";
import { clear } from "@testing-library/user-event/dist/clear";

/**
 * Returns weekly, monthly, or yearly statistics for completed
 * hours of studying.
 * @param {*} props
 * @returns
 */

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const PomoProgress = (props) => {
  let week = props.currentWeek;
  const myWeekData = props.chartData.weekData[week];
  const myMonthData = props.chartData.monthData;
  const [chartInfo, setChartInfo] = useState({
    labels: dayLabels,
    datasets: [
      {
        label: "Sessions Completed",
        data: myWeekData,
        backgroundColor: "#f54e4e",
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  });

  const onShowWeeklyHandler = () => {
    setChartInfo({
      labels: dayLabels,
      datasets: [
        {
          label: "Sessions Completed",
          data: myWeekData,
          backgroundColor: "#f54e4e",
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    });
    console.log(props.chartData);
  };

  const onShowMonthlyHandler = () => {
    setChartInfo({
      labels: monthLabels,
      datasets: [
        {
          label: "Sessions Completed",
          data: myMonthData,
          backgroundColor: "#f54e4e",
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    });
  };

  return (
    <section className="chart-container">
      <section>
        <button onClick={onShowWeeklyHandler}>Weekly</button>
        <button onClick={onShowMonthlyHandler}>Monthly</button>
      </section>
      <Line data={chartInfo} />
      <div className="button-bar-container">
        <BackButton onClick={() => props.onShowProgressChange(false)} />
        <ClearDataButton onClick={() => props.onClearAllUserData()} />
      </div>
    </section>
  );
};

export default PomoProgress;
