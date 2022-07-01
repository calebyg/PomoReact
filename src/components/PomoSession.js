import React from "react";

const PomoSession = (props) => {
  const increaseSessionTimer = () => {
    const currentInterval = props.sessionInterval;

    if (currentInterval === 60) return;
    props.onSessionIntervalChange(currentInterval + 1);
  };

  const decreaseSessionTimer = () => {
    const currentInterval = props.sessionInterval;
    if (currentInterval === 1) {
      return;
    }
    props.onSessionIntervalChange(currentInterval - 1);
  };

  return (
    <section>
      <h4>Session Length</h4>
      <section className="section-container">
        <button onClick={decreaseSessionTimer}>Down</button>
        <p>{props.sessionInterval}</p>
        <button onClick={increaseSessionTimer}>Up</button>
      </section>
    </section>
  );
};

export default PomoSession;
