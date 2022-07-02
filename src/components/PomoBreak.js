import React from "react";
const PomoBreak = (props) => {
  const increaseBreakInterval = () => {
    const currentInterval = props.breakInterval;

    if (currentInterval === 60) return;

    props.onBreakIntervalChange(currentInterval + 1);
  };

  const decreaseBreakInterval = () => {
    const currentInterval = props.breakInterval;
    if (currentInterval === 1) return;
    props.onBreakIntervalChange(currentInterval - 1);
  };
  return (
    <section>
      <h4>Break Length</h4>
      <section className="section-container">
        <button onClick={decreaseBreakInterval}>Down</button>
        <p className="interval-length">{props.breakInterval}</p>
        <button onClick={increaseBreakInterval}>Up</button>
      </section>
    </section>
  );
};

export default PomoBreak;
