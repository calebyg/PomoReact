import React, { useContext, useEffect, useRef, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import BackButton from "../ui/BackButton";
import SettingsContext from "../hooks/SettingsContext";

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
const LineChart = (props) => {
  const myMonthData = props.chartData.monthData;
  const myDayData = props.chartData.dayData;
  const [chartInfo, setChartInfo] = useState({
    labels: dayLabels,
    datasets: [
      {
        label: "Sessions Completed",
        data: myDayData,
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const onShowWeeklyHandler = () => {
    setChartInfo({
      labels: dayLabels,
      datasets: [
        {
          label: "Sessions completed",
          data: myDayData,
          backgroundColor: "red",
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  };

  const onShowMonthlyHandler = () => {
    setChartInfo({
      labels: monthLabels,
      datasets: [
        {
          label: "Sessions completed",
          data: myMonthData,
          backgroundColor: "red",
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  };

  return (
    <section style={{ width: "700px" }}>
      <section>
        <h1>Progress</h1>
        <h1>Current hours worked for {new Date().getDate()}:</h1>
        <button onClick={onShowWeeklyHandler}>Weekly</button>
        <button onClick={onShowMonthlyHandler}>Monthly</button>
      </section>
      <Line data={chartInfo} />
      <BackButton onClick={() => props.onShowProgressChange(false)} />
    </section>
  );
};

export default LineChart;
