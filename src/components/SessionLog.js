const SessionLog = (props) => {
  return (
    <section className="session-log-container">
      <h2>Task Name: {props.taskName}</h2>
      <h2>Pomodoro Time: {props.timerMinute}:00</h2>
    </section>
  );
};

export default SessionLog;
