const SessionLog = (props) => {
  return (
    <section>
      <h4>Task Name:</h4>
      {props.taskName}
      <h4>Pomodoro Time:</h4>
      {props.timerMinute}
    </section>
  );
};

export default SessionLog;
