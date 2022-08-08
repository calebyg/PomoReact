import React, { useContext, useEffect, useState } from "react";
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
/* Ranges: 
   Daily: From 12am - 11:59pm
   Week:  From last Mon - Sun
   Monthly: From first session's month to Dec 31 current year
*/
const LineChart = (props) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [userData, setUserData] = useState({
    labels: ["12am", "12am"],
    datasets: [
      {
        label: "Hours worked",
        data: props.chartData.map((data) => data.sessionTime),
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <section style={{ width: "700px" }}>
      <section>
        <button onClick={() => setUserData({ labels: ["12am", "12am"] })}>
          Daily
        </button>
        <button onClick={() => setUserData({ labels: days })}>Weekly</button>
        <button onClick={() => setUserData({ labels: months })}>Monthly</button>
      </section>
      <Line data={userData} />
      <BackButton onClick={() => props.onShowProgressChange(false)} />
    </section>
  );
};

export default LineChart;
